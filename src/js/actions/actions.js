import dispatcher from '../dispatcher/dispatcher';
import { ActionConstants } from '../constants/constants';

export default class Actions {

  static changeMode(mode) {
    dispatcher.handleAction({
      type: ActionConstants.CHANGE_MODE,
      mode
    });
  }

 static addMap(map) {
    dispatcher.handleAction({
      type: ActionConstants.ADD_MAP,
      map
    });
  }

  static addMarker(marker, content = '') {
    dispatcher.handleAction({
      type: ActionConstants.ADD_MARKER,
      marker,
      content
    });
  }

  static removeMarker(marker) {
    dispatcher.handleAction({
      type: ActionConstants.REMOVE_MARKER,
      marker
    });
  }

  static updateMarker(marker, content) {
    dispatcher.handleAction({
      type: ActionConstants.UPDATE_MARKER,
      marker,
      content
    });
  }

  static goToCoordinate(latLng) {
    dispatcher.handleAction({
      type: ActionConstants.GO_TO,
      latLng
    });
  }

  static mouseMoveOnMap(latLng) {
    dispatcher.handleAction({
      type: ActionConstants.MOUSE_MOVE_ON_MAP,
      latLng
    });
  }

  static registerMapCenter(latLng) {
    dispatcher.handleAction({
      type: ActionConstants.MAP_CENTER_REGISTER,
      latLng
    });
  }

  static handleError(error) {
    console.log(error);
    dispatcher.handleAction({
      type: ActionConstants.ERROR_HANDLE,
      error
    });
  }


}
