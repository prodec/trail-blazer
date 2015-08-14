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
    let time = Date.now();
    let dif = time - this.lastTime;

    if (dif > this.messageInterval) {
      this.lastTime = time;
      
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(message);
      }
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