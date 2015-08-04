jest
  .dontMock('../store')
  .dontMock('../positionStore')
  .dontMock('keymirror');

describe('PositionStore', () => {
  let ActionConstants = require('../../constants/constants').ActionConstants;
  let positionStore;
  let dispatcher;
  let callback;

  let actionGoToCoordinate = {
    type: ActionConstants.GO_TO,
    latLng: [1, 2]
  };
  let actionGoToCoordinateUpdate = {
    type: ActionConstants.GO_TO,
    latLng: [3, 4]
  };

  beforeEach(() => {
    positionStore = require('../positionStore');
    dispatcher = positionStore.dispatcher;
    callback = dispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', () => {
    expect(dispatcher.register.mock.calls.length).toBe(1);
  });

  describe('goToMarker', () => {
    it('initializes with latLng when null', () => {
      expect(positionStore.getState().goToMarker).toBe(null);
      callback(actionGoToCoordinate);
      let latLng = positionStore.getState().goToMarker.getLatLng().toString();
      expect(latLng).toBe('LatLng(1, 2)');
    });

    it('updates latLng', () => {
      callback(actionGoToCoordinate);
      expect(positionStore.getState().goToMarker).not.toBe(null);
      callback(actionGoToCoordinateUpdate);
      let latLng = positionStore.getState().goToMarker.getLatLng().toString();
      expect(latLng).toBe('LatLng(3, 4)');
    });
  });
});
