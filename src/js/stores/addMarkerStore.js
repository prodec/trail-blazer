import Store from './store';

class AddMarkerStore extends Store {
  constructor() {
    super();
    this.data = { markerToAdd: null };
  }

  registerCallbacks() {
    return this.dispatcher.register((action) => {
      switch(action.type) {
        case this.ActionConstants.ADD_MARKER:
          this.data.markerToAdd = action.marker;
          this.emitChange();
          break;

        default:
          break;
      }
    });
  }
}

let addMarkerStore = new AddMarkerStore();
export default addMarkerStore;
