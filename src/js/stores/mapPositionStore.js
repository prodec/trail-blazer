import Store from './store';
import mapStore from './mapStore';

class MapPositionStore extends Store {
  constructor() {
    super();
    this.data = { latLng: null };

    if (mapStore.getState() && mapStore.getState().map) {
      let map = mapStore.getState().map;

      this.data = { latLng: map.getCenter() };
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
