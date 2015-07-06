import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/dispatcher';
import { ActionConstants, EventConstants } from '../constants/constants';

let data = {
  cursor: null,
  goToMarker: null,
  map: null
  mode: null,
  marker: null
};

class MapStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = this.registerCallbacks();
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

  updateGoToMarkerPosition(latlon) {
    let marker = data.goToMarker;
    if (marker) {
      marker.setLatLng(latlon);
    } else {
      this.initGoToMarker(latlon);
    }
    return this;
  }

  initGoToMarker(latlon) {
    let circle = L.circleMarker(latlon, {
                                  radius: 7,
                                  weight: '1',
                                  color: 'green',
                                  opacity: 0.85,
                                  fillColor: '#00ff00',
                                  fillOpacity: 0.85
                                });
    data.goToMarker = circle;
  }

  registerCallbacks() {
    return dispatcher.register((action) => {
      switch(action.type) {
        case ActionConstants.CHANGE_CURSOR:
          data.cursor = action.cursor;
          this.emitChange(EventConstants.CHANGE_CURSOR);
          break;

        case ActionConstants.ADD_MAP:
          data.map = action.map;
          this.emitChange(EventConstants.CHANGE_MAP);
          break;

        case ActionConstants.GO_TO:
          let latlon = action.latlon;
          this.updateGoToMarkerPosition(latlon)
              .emitChange(EventConstants.CHANGE_GO_TO);
          break;

        case constants.CHANGE_CURSOR:
          data.cursor = action.cursor;
          mapStore.emitChange(constants.CHANGE_CURSOR);
          break;

        case constants.ADD_MARKER:
          data.marker = action.marker;
          mapStore.emitChange(constants.ADD_MARKER);
          break;

        default:
          break;
      }
    });
  }
}

let mapStore = new MapStore();
export default mapStore;
