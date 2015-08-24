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
    this.forecastApiEndpoint = 'https://api.forecast.io/forecast';
    this.forecastApiKey = 'xxx';
  }

  buildUrl() {
    return `${this.forecastApiEndpoint}/${this.forecastApiKey}/${this.lat},${this
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
