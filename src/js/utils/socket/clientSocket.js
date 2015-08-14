export const ENDPOINT = 'ws://suchgreatheights.sigvia.com';

export default class ClientSocket {
  
  constructor(callback) {
    //message interval in milliseconds
    this.messageInterval = 40;
    this.lastTime = Date.now();

    this.initWebSocket(callback);
  }

  initWebSocket(callback) {
    this.ws = new WebSocket(ENDPOINT);
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