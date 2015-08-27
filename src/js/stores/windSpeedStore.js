import Actions from '../actions/actions';
import Store from './store';
import ApiFetch from '../utils/apiFetch';
import PositionInTime from '../utils/positionInTime';
import debounce from '../utils/debounce';
import contextPositionStore from './contextPositionStore';
import flightTimeStore from './flightTimeStore';
import { EndpointConstants, SettingConstants } from '../constants/constants';

class WindSpeedStore extends Store {
  constructor() {
    super();
    this.data.windSpeed = 0;
    this.fetchAndEmitChange();
  }

  registerCallbacks() {
    return this.dispatcher.register((action) => {
      switch(action.type) {
        case this.ActionConstants.MAP_CENTER_REGISTER:
          this.dispatcher.waitFor([contextPositionStore.dispatchToken]);
          this.fetchAndEmitChange();
          break;

        case this.ActionConstants.FLIGHT_TIME_UPDATE:
          this.dispatcher.waitFor([flightTimeStore.dispatchToken]);
          this.fetchAndEmitChange();
          break;

        default:
          break;
      }
    });
  }

  fetchAndEmitChange = debounce(async () => {
    try {
      this.data.windSpeed = await this.fetchWindSpeed();
      this.emitChange();
    } catch (error) { Actions.handleError(error); }
  }, SettingConstants.DEBOUNCE_INTERVAL)

  fetchWindSpeed() {
    let { lat, lng, time } = PositionInTime.getCurrent();

    if(!(lat && lng && time)) { return; }
    let options = {
      url: EndpointConstants.WIND_SPEED_FETCH,
      query: { lat, lng, time },
      responseParser: body => { return Math.round(body.windSpeed); }
    };
    return new ApiFetch(options).run();
  }
}

export default new WindSpeedStore();
