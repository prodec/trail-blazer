import L from 'leaflet';
import Store from './store';
import ClientSocket from '../utils/clientSocket';

class HeightStore extends Store {
  constructor() {
    super();
    this.data = { ws: null};
    this.data.ws = new ClientSocket(this.updateHeight);
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

  updateHeight(message) {
    
    let { altitude } = JSON.parse(message.data).data;
    
    //update height component
    console.log('Height Updated: %s', altitude);
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

let heightStore = new HeightStore();
export default heightStore;
