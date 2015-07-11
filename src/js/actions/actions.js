import dispatcher from '../dispatcher/dispatcher';
import { ActionConstants } from '../constants/constants';

export default class Actions {
  static changeCursor(cursor) {
    dispatcher.handleAction({
      type: ActionConstants.CHANGE_CURSOR,
      cursor
    });
  }

  static changeMode(mode) {
    dispatcher.handleAction({
      type: ActionConstants.CHANGE_MODE,
      mode
    });
  }

  static addMarker(marker) {
    dispatcher.handleAction({
      type: ActionConstants.ADD_MARKER,
      marker
    });
  }

  static addMap(map) {
    dispatcher.handleAction({
      type: ActionConstants.ADD_MAP,
      map
    });
  }

  static goToCoordinate(latlng) {
    dispatcher.handleAction({
      type: ActionConstants.GO_TO,
      latlng
    });
  }
}
