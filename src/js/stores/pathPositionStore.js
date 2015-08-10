import Store from './store';

class PathPositionStore extends Store {
  constructor() {
    super();
    this.data = { latLng: null };
  }
}

export default new PathPositionStore();
