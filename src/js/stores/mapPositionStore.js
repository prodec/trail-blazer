import Store from './store';
import mapStore from './mapStore';

class MapPositionStore extends Store {
  constructor() {
    super();
    let map = mapStore.getState().map;

    if (map) {
      this.data.latLng = map.getCenter();
    }
  }

  registerCallbacks() {
    return this.dispatcher.register((action) => {
      switch(action.type) {
        case this.ActionConstants.MAP_CENTER_REGISTER:
          this.data.latLng = action.latLng;
          this.emitChange();
          break;

        default:
          break;
      }
    });
  }
}

export default new MapPositionStore();
