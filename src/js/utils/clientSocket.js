export const ENDPOINT = 'ws://suchgreatheights.sigvia.com';

export default class ClientSocket {
  
  constructor(callback) {
    this.messageInterval = 40;
    this.lastTime = Date.now();

    this.initWebSocket(callback);
  }

  initWebSocket(callback) {
    this.ws = new WebSocket(ENDPOINT);

    this.ws.onmessage = ((message) => {
      callback(message);
    });
  }

  send(message) {
  	let time = Date.now();
  	let dif = time - this.lastTime;

    if(dif > this.messageInterval) {
      this.lastTime = time;
      
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(message);
      }
    }
  }

}