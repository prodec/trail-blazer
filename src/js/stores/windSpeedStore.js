import Actions from '../actions/actions';
import Store from './store';
import ApiFetch from '../utils/apiFetch';
import PositionInTime from '../utils/positionInTime';
import contextPositionStore from './contextPositionStore';
import { EndpointConstants } from '../constants/constants';

class WindSpeedStore extends Store {
  constructor() {
    super();
    this.data.windSpeed = 0;
    this.fetchAndEmitChange();
  }

  registerCallbacks() {
    return this.dispatcher.register((action) => {
      switch(action.type) {
        case this.ActionConstants.WIND_SPEED_FETCH:
          this.data.windSpeed = action.windSpeed;
          this.emitChange();
          break;

        case this.ActionConstants.MAP_CENTER_REGISTER:
          this.dispatcher.waitFor([contextPositionStore.dispatchToken]);
          this.fetchAndEmitChange();
          break;

        default:
          break;
      }
    });
  }

  async fetchAndEmitChange() {
    try {
      let { lat, lng, time } = PositionInTime.getCurrent();

      if (lat && lng && time) {
        let options = {
          method: 'get',
          url: EndpointConstants.WIND_SPEED_FETCH,
          query: { lat, lng, time },
          responseParser: body => { return Math.round(body.windSpeed); }
        };
        this.data.windSpeed = await new ApiFetch(options).run();
        this.emitChange();
      }
    } catch (error) { Actions.handleError(error); }
  }
}

export default new WindSpeedStore();
