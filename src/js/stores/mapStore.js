import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/dispatcher';
import { ActionConstants, EventConstants } from '../constants/constants';

let _data = {
  cursor: null,
  goToMarker: null,
  map: null
};

class MapStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = this._registerCallbacks();
  }

  getState() {
    return _data;
  }

  addChangeListener(callback, change = EventConstants.CHANGE) {
    this.on(change, callback);
  }

  removeChangeListener(callback, change = EventConstants.CHANGE) {
    this.removeListener(change, callback);
  }

  _emitChange(change = EventConstants.CHANGE) {
    this.emit(change);
  }

  _initGoToMarker(latlon) {
    let circle = L.circleMarker(latlon, {
                                  radius: 7,
                                  weight: '1',
                                  color: 'green',
                                  opacity: 0.85,
                                  fillColor: '#00ff00',
                                  fillOpacity: 0.85
                                }).addTo(_data.map);
    _data.goToMarker = circle;
  }

  _registerCallbacks() {
    return dispatcher.register(action => {
      switch(action.type) {
        case ActionConstants.CHANGE_CURSOR:
          _data.cursor = action.cursor;
          this._emitChange(EventConstants.CHANGE_CURSOR);
          break;

        case ActionConstants.ADD_MAP:
          _data.map = action.map;
          this._emitChange(EventConstants.CHANGE_MAP);
          break;

        case ActionConstants.GO_TO:
          let latlon = action.latlon;
          this
            ._updateGoToMarkerPosition(latlon)
            ._updateMapCenter(latlon)
            ._emitChange(EventConstants.CHANGE_GOTO);
          break;

        default:
          break;
      }
    });
  }

  _updateGoToMarkerPosition(latlon) {
    let marker = _data.goToMarker;
    if (marker) {
      marker.setLatLng(latlon);
    } else {
      this._initGoToMarker(latlon);
    }
    return this;
  }

  _updateMapCenter(latlon) {
    _data.map.setView(latlon);
    return this;
  }
}

let mapStore = new MapStore();
export default mapStore;
