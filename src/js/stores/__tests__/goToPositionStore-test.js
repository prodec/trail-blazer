jest
  .dontMock('../store')
  .dontMock('../goToPositionStore')
  .dontMock('keymirror');

describe('GoToPositionStore', () => {
  let ActionConstants = require('../../constants/constants').ActionConstants;
  let goToPositionStore, dispatcher, callback;

  let actionGoToCoordinate = {
    type: ActionConstants.GO_TO,
    latLng: [1, 2]
  };
  let actionGoToCoordinateUpdate = {
    type: ActionConstants.GO_TO,
    latLng: [3, 4]
  };

  beforeEach(() => {
    goToPositionStore = require('../goToPositionStore');
    dispatcher = goToPositionStore.dispatcher;
    callback = dispatcher.register.mock.calls[0][0];
  });

  describe('goToMarker', () => {
    it('initializes with latLng when null', () => {
      expect(goToPositionStore.getState().goToMarker).toBeNull();
      callback(actionGoToCoordinate);
      let latLng = goToPositionStore.getState().goToMarker.getLatLng().toString();
      expect(latLng).toBe('LatLng(1, 2)');
    });

    it('updates latLng', () => {
      callback(actionGoToCoordinate);
      expect(goToPositionStore.getState().goToMarker).not.toBeNull();
      callback(actionGoToCoordinateUpdate);
      let latLng = goToPositionStore.getState().goToMarker.getLatLng().toString();
      expect(latLng).toBe('LatLng(3, 4)');
    });
  });
});
