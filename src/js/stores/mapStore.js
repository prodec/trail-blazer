import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/dispatcher';
import Marker from '../utils/marker';
import { ActionConstants, EventConstants } from '../constants/constants';

let data = {
  cursor: null,
  map: null,
  mode: null,
  markers: new Map(),
  layerToRemove: null,
  layerToAdd: null,
  layerToUpdate: null
};

class MapStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = this.registerCallbacks();
  }

  addOrUpdateMarker(marker, content) {
    let id = Marker.idOnMap(marker);
    let markerData = { marker, content };

    data.markers.set(id, markerData);
    data.layerToAdd = marker;
  }

  removeMarker(marker) {
    let id = Marker.idOnMap(marker);

    data.markers.delete(id);
    data.layerToRemove = marker;
  }

  getState() {
    return data;
  }

  addChangeListener(callback, change = EventConstants.CHANGE) {
    this.on(change, callback);
  }

  removeChangeListener(callback, change = EventConstants.CHANGE) {
    this.removeListener(change, callback);
  }

  emitChange(change = EventConstants.CHANGE) {
    this.emit(change);
  }

  registerCallbacks() {
    return dispatcher.register((action) => {
      switch(action.type) {
        case ActionConstants.ADD_MAP:
          data.map = action.map;
          this.emitChange(EventConstants.CHANGE_MAP);
          break;

        case ActionConstants.CHANGE_CURSOR:
          data.cursor = action.cursor;
          this.emitChange(EventConstants.CHANGE_CURSOR);
          break;

        case ActionConstants.ADD_MARKER:
          this.addOrUpdateMarker(action.marker, action.content);
          this.emitChange(EventConstants.ADD_MARKER);
          break;

        case ActionConstants.REMOVE_MARKER:
          this.removeMarker(action.marker);
          this.emitChange(EventConstants.REMOVE_MARKER);
          break;

        case ActionConstants.UPDATE_MARKER:
          this.addOrUpdateMarker(action.marker, action.content);
          this.emitChange(EventConstants.UPDATE_MARKER);
          break;

        case ActionConstants.CHANGE_MODE:
          data.mode = action.mode;
          this.emitChange(EventConstants.CHANGE_MODE);
          break;

        default:
          break;
      }
    });
  }
}

let mapStore = new MapStore();
export default mapStore;
