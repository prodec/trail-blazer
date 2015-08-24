import contextPositionStore from '../stores/contextPositionStore';
import flightTimeStore from '../stores/flightTimeStore';

export default class PositionInTime {
  static getCurrent() {
    let { lat, lng } = this.getCurrentPosition();
    let time = this.getCurrentTime().format();

    return { lat, lng, time };
  }

  static getCurrentPosition() {
    return contextPositionStore.getState().latLng;
  }

  static getCurrentTime() {
    return flightTimeStore.getState().time;
  }
}
