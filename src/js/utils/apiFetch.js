import Qs from 'qs';
import 'isomorphic-fetch';

export default class ApiFetch {
  isDevelopment = ServerConstants.NODE_ENV === 'development'
  port = ServerConstants.PORT

  constructor(options) {
    this.url = this.buildUrl(options.url);
    this.init = { method: options.method || 'get' };
    this.responseParser = options.responseParser;
    this.addQuery(options.query);
  }

  run() {
    return fetch(this.url, this.init)
      .then(res => {
        if (res.status >= 400) { throw new Error(res.statusText); }
        return res.json(); })
      .then(this.responseParser ? this.responseParser : body => { return body; });
  }

  buildUrl(url){
    if(this.isDevelopment) { return `http://localhost:${this.port}${url}`; }
    return url;
  }

  addQuery(query) {
    if(!query) { return; }
    let method = this.init.method.toUpperCase();

    if(method === 'GET' || method === 'HEAD') {
      this.url = `${this.url}?${Qs.stringify(query)}`;
    } else {
      this.init.body = JSON.stringify(query);
    }
  }
}
