import Store from './store';

class RemoveMarkerStore extends Store {
  constructor() {
    super();
    this.data = { markerToRemove: null };
  }

  registerCallbacks() {
    return this.dispatcher.register((action) => {
      switch(action.type) {
        case this.ActionConstants.REMOVE_MARKER:
          this.data.markerToRemove = action.marker;
          this.emitChange();
          break;

        default:
          break;
      }
    });
  }
}

let removeMarkerStore = new RemoveMarkerStore();
export default removeMarkerStore;
