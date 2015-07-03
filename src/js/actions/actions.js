import dispatcher from '../dispatcher/dispatcher';
import { ActionConstants } from '../constants/constants';

export default class Actions {
  static changeCursor(cursor) {
    dispatcher.handleAction({
      type: ActionConstants.CHANGE_CURSOR,
      cursor
    });
  }

  static addMap(map) {
    dispatcher.handleAction({
      type: ActionConstants.ADD_MAP,
      map
    });
  }
}
