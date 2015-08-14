import Store from './store';
import markerStore from './markerStore';

class UpdateMarkerStore extends Store {
  constructor() {
    super();
  }

  registerCallbacks() {
    return this.dispatcher.register((action) => {
      switch(action.type) {
        case this.ActionConstants.UPDATE_MARKER:
          this.dispatcher.waitFor([markerStore.dispatchToken]);
          this.emitChange();
          break;

        default:
          break;
      }
    });
  }
}

let updateMarkerStore = new UpdateMarkerStore();
export default updateMarkerStore;
