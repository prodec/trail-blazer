import Store from './store';
import pathPositionStore from './pathPositionStore';
import mapPositionStore from './mapPositionStore';

class ContextPositionStore extends Store {
  constructor() {
    super();
    this.initLatLng();
  }

  initLatLng() {
    let latLng = pathPositionStore.getState().latLng ||
                 mapPositionStore.getState().latLng ||
                 { lat: null, lng: null };

    this.data = { latLng };
  }

  registerCallbacks() {
    return this.dispatcher.register((action) => {
      switch(action.type) {
        case this.ActionConstants.MAP_CENTER_REGISTER:
          if(pathPositionStore.getState().latLng) { break; }
          this.dispatcher.waitFor([mapPositionStore.dispatchToken]);
          this.data.latLng = mapPositionStore.getState().latLng;
          this.emitChange();
          break;

        default:
          break;
      }
    });
  }
}

export default new ContextPositionStore();
