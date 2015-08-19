import Qs from 'qs';
import 'isomorphic-fetch';

export default class WindApi {
  query = {
    units: 'ca',
    exclude: 'hourly,daily,flags'
  }

  constructor(lat, lng, time) {
    this.lat = lat;
    this.lng = lng;
    this.time = time ? `,${time}` : '';
    this.forecast_api_endpoint = 'https://api.forecast.io/forecast';
    this.forecast_api_key = 'xxx';
  }

  buildUrl() {
    return `${this.forecast_api_endpoint}/${this.forecast_api_key}/${this.lat},${this
              .lng}${this.time}?${Qs.stringify(this.query)}`;
  }

  getWeather() {
    return fetch(this.buildUrl(), { method: 'get' })
      .then(res => {
        if (res.status >= 400) { throw new Error(res.statusText); }
        return res.json();
      });
  }

  getWindSpeed() {
    return this.getWeather()
      .then(body => { return body.currently.windSpeed; });
  }
}
