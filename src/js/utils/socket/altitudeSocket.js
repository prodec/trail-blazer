import ClientSocket from './clientSocket';

export default class AltitudeSocket extends ClientSocket {
  
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

    this.send(message);
  }

  keepAlive() {
    this.debounce(this.sendPing(), 15000);
  }

  sendPing() {
    let time = Date.now();
    let message = JSON.stringify({
      command: "ping",
      sent_at: time
    });

    this.send(message);
  }
}