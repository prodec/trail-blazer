import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/dispatcher';
import { ActionConstants, EventConstants } from '../constants/constants';

export default class Store extends EventEmitter {
  constructor() {
    super();
    this.data = {};
    this.dispatcher = dispatcher;
    this.ActionConstants = ActionConstants;
    this.EventConstants = EventConstants;
    this.dispatchToken = this.registerCallbacks();
  }

  registerCallbacks() {}

  getState() {
    return this.data;
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
}
