import L from 'leaflet';
import Store from './store';
import AltitudeSocket from '../utils/socket/altitudeSocket';

class AltitudeStore extends Store {
  constructor() {
    super();
    this.data = { ws: null, altitude: 0};
    this.data.ws = new AltitudeSocket(this.receiveMessage);
    this.data.ws.keepAlive();
  }

  receiveMessage = (message) => {
    let body = JSON.parse(message.data);
    if (body.response === "point_altitude") {
      let { altitude } = body.data;
      this.data.altitude = altitude;
      this.emitChange();
    }
  }

  registerCallbacks() {
    return this.dispatcher.register((action) => {
      switch(action.type) {
        case this.ActionConstants.MOUSE_MOVE_ON_MAP:
          this.data.ws.requestHeight(action.latLng);
          this.emitChange();
          break;

        default:
          break;
      }
    });
  }
}

let altitudeStore = new AltitudeStore();
export default altitudeStore;
