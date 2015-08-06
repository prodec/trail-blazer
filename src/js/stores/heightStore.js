import L from 'leaflet';
import Store from './store';

class HeightStore extends Store {
  constructor() {
    super();
    let messageInterval = 40;//Minimum interval time between messages in milliseconds
    this.data = { ws: null, lastTime: null, messageInterval };
    this.initWebSocket();
  }

  initWebSocket() {
    let ENDPOINT = 'ws://192.168.0.116:7331';
    let ws = new WebSocket(ENDPOINT);

    ws.onmessage = ((message) => {
      console.log("Received: "+message);
      this.updateHeight(message);
    });

    this.data.ws = ws;
  }

  requestHeight(latLng) {
    let message = JSON.stringify({
      command: "point_altitude",
      lat: latLng.lat,
      lng: latLng.lng
    });

    this.send(message);
  }

  send(message) {
    let time = +new Date();
    let dif = time - this.data.lastTime;

    if(dif > this.data.messageInterval) {
      this.data.lastTime = time;
      let ws = this.data.ws;

      if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
      }
    }    
  }

  updateHeight(message) {
    let { altitude } = JSON.parse(message.data);

    //update height component
    console.log('Height Updated: %s', altitude);
  }

  registerCallbacks() {
    return this.dispatcher.register((action) => {
      switch(action.type) {
        case this.ActionConstants.CHANGE_COORDINATE:
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
