import Store from './store';
import moment from 'moment-timezone';

class FlightTimeStore extends Store {
  constructor() {
    super();
    this.data.time = moment(Date.now()).tz('America/Sao_Paulo').format();
  }
}

export default new FlightTimeStore();
