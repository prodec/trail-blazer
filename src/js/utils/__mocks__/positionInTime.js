export default class PositionInTime {
  static getCurrent() {
    return { lat: null, lng: null, time: null };
  }

  static getCurrentPosition() {
    return { lat: null, lng: null };
  }

  static getCurrentTime() {
    return { time: null };
  }
}
