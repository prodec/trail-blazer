import L from 'leaflet';
import Store from './store';
import ClientSocket from '../utils/clientSocket';

class AltitudeStore extends Store {
  constructor() {
    super();
    this.data = { ws: null, altitude: 0};
    this.data.ws = new ClientSocket(this.receiveMessage);
    this.keepAlive();
  }

  keepAlive() {
    //15 seconds
    let interval = 15000;

    setInterval(() => {
      let time = Date.now();
      let message = JSON.stringify({
        command: "ping",
        sent_at: time
      });
      
      this.data.ws.send(message);
    }, interval);
  }

  requestHeight(latLng) {
    let time = Date.now();

    let message = JSON.stringify({
      command: "point_altitude",
      sent_at: time,
      payload: {
        lat: latLng.lat,
        lng: latLng.lng
      }
    });

    this.data.ws.send(message);
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
          this.requestHeight(action.latLng);
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
