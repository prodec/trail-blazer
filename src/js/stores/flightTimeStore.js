import Store from './store';
import moment from 'moment';

class FlightTimeStore extends Store {
  constructor() {
    super();
    this.data = { time: this.getDeviceDateTime() };
  }

  registerCallbacks() {
    return this.dispatcher.register((action) => {
      switch(action.type) {
        case this.ActionConstants.FLIGHT_TIME_UPDATE:
          this.data.time = action.flightTime;
          this.emitChange();
          break;

        case this.ActionConstants.UTC_REGISTER:
          this.changeTimezone(action.utc);
          this.emitChange();
          break;

        default:
          break;
      }
    });
  }

  getDeviceDateTime() {
    return moment(Date.now());
  }

  changeTimezone(utcOffset) {
    return this.data.time.utcOffset(utcOffset);
  }
}

export default new FlightTimeStore();
