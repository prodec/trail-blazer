import Store from './store';
import Marker from '../utils/marker';

class MarkerStore extends Store {
  constructor() {
    super();
    this.data = { markers: new Map() };
  }

  addMarker(marker) {
    let id = Marker.idOnMap(marker);
    let markerData = { marker, content };

    this.data.markers.set(id, markerData);
  }

  removeMarker(marker) {
    let id = Marker.idOnMap(marker);

    data.markers.delete(id);
  }

  registerCallbacks() {
    return this.dispatcher.register((action) => {
      switch(action.type) {
        case this.ActionConstants.ADD_MARKER:
          this.addMarker(action.marker);
          this.emitChange();
          break;

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

let addMarkerStore = new AddMarkerStore();
export default addMarkerStore;
