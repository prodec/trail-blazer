import L from 'leaflet';
import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/dispatcher';
import Marker from '../utils/marker';
import { ActionConstants, EventConstants } from '../constants/constants';

let data = {
  cursor: null,
  goToMarker: null,
  map: null,
  mode: null,
  markers: {},
  layerToRemove: null,
  layerToAdd: null
};

class MapStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = this.registerCallbacks();
  }

  addMarker(marker) {
    let id = Marker.idOnMap(marker);

    data.markers[id] = marker;
    data.layerToAdd = marker;
  }

  removeMarker(marker) {
    let id = Marker.idOnMap(marker);

    delete(data.markers[id]);
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

  updateGoToMarkerPosition(latlng) {
    let marker = data.goToMarker;

    if (marker) {
      marker.setLatLng(latlng);
    } else {
      this.initGoToMarker(latlng);
    }
  }

  initGoToMarker(latlng) {
    let options = { radius: 7,
                    weight: '1',
                    color: 'green',
                    opacity: 0.85,
                    fillColor: '#00ff00',
                    fillOpacity: 0.85 };
    let circle = L.circleMarker(latlng, options);
    data.goToMarker = circle;
  }

  registerCallbacks() {
    return dispatcher.register((action) => {
      switch(action.type) {
        case ActionConstants.ADD_MAP:
          data.map = action.map;
          this.emitChange(EventConstants.CHANGE_MAP);
          break;

        case ActionConstants.GO_TO:
          this.updateGoToMarkerPosition(action.latlng);
          this.emitChange(EventConstants.CHANGE_GO_TO);
          break;

        case ActionConstants.CHANGE_CURSOR:
          data.cursor = action.cursor;
          this.emitChange(EventConstants.CHANGE_CURSOR);
          break;

        case ActionConstants.ADD_MARKER:
          this.addMarker(action.marker);
          this.emitChange(EventConstants.ADD_MARKER);
          break;

        case ActionConstants.REMOVE_MARKER:
          this.removeMarker(action.marker);
          this.emitChange(EventConstants.REMOVE_MARKER);
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
