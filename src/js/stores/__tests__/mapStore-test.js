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
    latlng: [1, 2]
  };
  let actionGoToCoordinateUpdate = {
    type: ActionConstants.GO_TO,
    latlng: [3, 4]
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
    it('initializes with latlng when null', () => {
      expect(mapStore.getState().goToMarker).toBe(null);
      callback(actionGoToCoordinate);
      let latlng = mapStore.getState().goToMarker.getLatLng().toString();
      expect(latlng).toBe('LatLng(1, 2)');
    });

    it('updates latlng', () => {
      callback(actionGoToCoordinate);
      expect(mapStore.getState().goToMarker).not.toBe(null);
      callback(actionGoToCoordinateUpdate);
      let latlng = mapStore.getState().goToMarker.getLatLng().toString();
      expect(latlng).toBe('LatLng(3, 4)');
    });
  });
});
