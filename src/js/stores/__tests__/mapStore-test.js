jest
  .dontMock('../mapStore')
  .dontMock('keymirror');

describe('MapStore', () => {
  let ActionConstants = require('../../constants/constants').ActionConstants;
  let dispatcher;
  let mapStore;
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
    dispatcher = require('../../dispatcher/dispatcher');
    mapStore = require('../mapStore');
    callback = dispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', () => {
    expect(dispatcher.register.mock.calls.length).toBe(1);
  });

  describe('goToMarker', () => {
    it('initializes with latLng when null', () => {
      expect(mapStore.getState().goToMarker).toBe(null);
      callback(actionGoToCoordinate);
      let latLng = mapStore.getState().goToMarker.getLatLng().toString();
      expect(latLng).toBe('LatLng(1, 2)');
    });

    it('updates latLng', () => {
      callback(actionGoToCoordinate);
      expect(mapStore.getState().goToMarker).not.toBe(null);
      callback(actionGoToCoordinateUpdate);
      let latLng = mapStore.getState().goToMarker.getLatLng().toString();
      expect(latLng).toBe('LatLng(3, 4)');
    });
  });
});
