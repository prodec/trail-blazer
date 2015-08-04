import Store from './store';
import Marker from '../utils/marker';
import markerStore from './markerStore';

class UpdateMarkerStore extends Store {
  constructor() {
    super();
    this.data = { markerToUpdate: null };
  }

  updateMarker(marker, content) {
    let markers = markerStore.getState().markers;
    let id = Marker.idOnMap(marker);
    let markerData = { marker, content };

    markers.set(id, markerData);
  }

  registerCallbacks() {
    return this.dispatcher.register((action) => {
      switch(action.type) {
        case this.ActionConstants.UPDATE_MARKER:
          this.dispatcher.waitFor([markerStore.dispatchToken]);
          this.updateMarker(action.marker, action.content);
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
