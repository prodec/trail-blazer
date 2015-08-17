jest
  .dontMock('../store')
  .dontMock('../mapPositionStore')
  .dontMock('../pathPositionStore')
  .dontMock('../contextPositionStore')
  .dontMock('keymirror');

describe('ContextPositionStore', () => {
  let ActionConstants = require('../../constants/constants').ActionConstants;
  let pathPositionStore;
  let contextPositionStore;
  let mapPositionStore;
  let dispatcher;
  let callback;

  let actionMapCenterRegister = {
    type: ActionConstants.MAP_CENTER_REGISTER
  };

  beforeEach(() => {
    contextPositionStore = require('../contextPositionStore');
    pathPositionStore = require('../pathPositionStore');
    mapPositionStore = require('../mapPositionStore');
    dispatcher = contextPositionStore.dispatcher;
    callback = dispatcher.register.mock.calls[1][0];
  });

  it('sets latLng and emits ', () => {
    let latLng = { lat: 1, lng: 2 };
    mapPositionStore.getState = jest.genMockFunction().mockReturnValue({ latLng });
    contextPositionStore.emitChange = jest.genMockFunction();

    callback(actionMapCenterRegister);
    expect(contextPositionStore.data.latLng).toEqual(latLng);
    expect(contextPositionStore.emitChange).toBeCalled();
  });

  it('ignores action when pathPositionStore has latLng', () => {
    let latLng = { lat: 1, lng: 2 };
    pathPositionStore.getState = jest.genMockFunction().mockReturnValue({ latLng });
    contextPositionStore.emitChange = jest.genMockFunction();

    callback(actionMapCenterRegister);
    expect(contextPositionStore.data.latLng).not.toEqual(latLng);
    expect(contextPositionStore.emitChange).not.toBeCalled();
  });
});
