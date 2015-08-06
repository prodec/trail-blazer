import Store from './store';
import Marker from '../utils/marker';

class MarkerStore extends Store {
  constructor() {
    super();
    this.data = { markers: new Map() };
  }

  addMarker(marker, content) {
    let id = this.idOnMap(marker);
    let markerData = { marker, content };

    this.data.markers.set(id, markerData);
  }

  removeMarker(marker) {
    let id = Marker.idOnMap(marker);

    this.data.markers.delete(id);
  }

  updateMarker(marker, content) {
    let id = Marker.idOnMap(marker);
    let markerData = { marker, content };

    this.data.markers.set(id, markerData);
  }

  idOnMap(marker) {
    return Marker.idOnMap(marker);
  }

  registerCallbacks() {
    return this.dispatcher.register((action) => {
      switch(action.type) {
        case this.ActionConstants.ADD_MARKER:
          this.addMarker(action.marker, action.content);
          this.emitChange();
          break;

        case this.ActionConstants.REMOVE_MARKER:
          this.removeMarker(action.marker);
          this.emitChange();
          break;

        case this.ActionConstants.UPDATE_MARKER:
          this.updateMarker(action.marker, action.content);
          this.emitChange();
          break;

        default:
          break;
      }
    });
  }
}

let markerStore = new MarkerStore();
export default markerStore;
