import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/dispatcher';
import { ActionConstants, EventConstants } from '../constants/constants';

let _data = { cursor: null, map: null };

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

        default:
          break;
      }
    });
  }
}

let mapStore = new MapStore();
export default mapStore;
