jest
  .dontMock('../store')
  .dontMock('../mapPositionStore')
  .dontMock('keymirror');

describe('MapPositionStore', () => {
  let ActionConstants = require('../../constants/constants').ActionConstants;
  let mapPositionStore;
  let dispatcher;
  let callback;

  let actionMapCenterRegister = {
    type: ActionConstants.MAP_CENTER_REGISTER,
    latLng: [1, 2]
  };

  beforeEach(() => {
    mapPositionStore = require('../mapPositionStore');
    dispatcher = mapPositionStore.dispatcher;
    callback = dispatcher.register.mock.calls[0][0];
  });

  it('sets latLng and emits', () => {
    mapPositionStore.emitChange = jest.genMockFunction();

    callback(actionMapCenterRegister);
    expect(mapPositionStore.data.latLng).toEqual([1, 2]);
    expect(mapPositionStore.emitChange).toBeCalled();
  });
});
