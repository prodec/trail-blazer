import request from 'requisition';

export default class WindApi {
  constructor(lat, lng, time) {
    this.lat = lat;
    this.lng = lng;
    this.time = time ? `,${time}` : '';
  }

  baseUrl = 'https://api.forecast.io/forecast'

  buildUrl() {
    return `${this.baseUrl}/${process.env.FORECAST_API_KEY}/${this.lat},${this.lng}${this.time}`;
  }

  async getWindSpeed() {
    return await request
      .get(this.buildUrl())
      .query({ units: 'ca' }) // km/h
      .query({ exclude: 'hourly,daily,flags' })
      .then((res) => { return res.json(); })
      .then((body) => { return body.currently.windSpeed; });
  }
}
