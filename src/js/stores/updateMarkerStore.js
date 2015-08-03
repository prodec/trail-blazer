import Store from './store';
import markerStore from './markerStore';

class UpdateMarkerStore extends Store {
  constructor() {
    super();
    this.data = { markerToUpdate: null };
  }

  updateMarker(marker) {
    let markers = markerStore.getState().markers;
    let id = Marker.idOnMap(marker);
    let markerData = { marker, content };

    data.markers.set(id, markerData);
  }

  registerCallbacks() {
    return this.dispatcher.register((action) => {
      switch(action.type) {
        case this.ActionConstants.UPDATE_MARKER:
          this.dispatcher.waitFor([markerStore.dispatchToken]);
          this.updateMarker(action.marker);
          this.emitChange();
          break;
        default:
          break;
      }
    });
  }
}

let updateMarkerStore = new updateMarkerStore();
export default updateMarkerStore;
