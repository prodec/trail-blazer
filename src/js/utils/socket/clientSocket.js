import { AltitudeEndpoint } from '../../constants/constants'

export default class ClientSocket {
  
  constructor() {
    //message interval in milliseconds
    this.messageInterval = 40;
    this.lastTime = Date.now();
  }

  initWebSocket(callback) {
    this.ws = new WebSocket(AltitudeEndpoint);
    this.ws.onmessage = callback;
  }

  send(message) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.debounce(this.ws.send(message), this.messageInterval);
    }
  }

  debounce(fn, period) {
    let currentTimeout;

    return ((...args) => {
      if (currentTimeout) {
        clearTimeout(currentTimeout);
        currentTimeout = null;
      }

      currentTimeout = setTimeout(() => {
        fn.apply(null, args);
      }, period);
    });
  }

}