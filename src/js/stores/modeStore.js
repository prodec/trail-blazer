import Store from './store';
import { ModeConstants, CursorConstants } from '../constants/constants';

class ModeStore extends Store {
  constructor() {
    super();
    let modes = new Map();
    modes.set(ModeConstants.MARKER_MODE, { cursor: CursorConstants.CURSOR_CROSSHAIR });
    modes.set(ModeConstants.GO_TO_MODE, { cursor: CursorConstants.CURSOR_GRAB });
    modes.set(ModeConstants.VIEW_MODE, { cursor: CursorConstants.CURSOR_GRAB });
    this.data['modes'] = modes;
  }

  registerCallbacks() {
    return this.dispatcher.register((action) => {
      switch(action.type) {
        case this.ActionConstants.CHANGE_MODE:
          this.data.active = action.mode;
          this.emitChange();
          break;

        default:
          break;
      }
    });
  }
}

let modeStore = new ModeStore();
export default modeStore;
