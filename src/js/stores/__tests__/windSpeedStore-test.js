jest
  .dontMock('../store')
  .dontMock('../windSpeedStore')
  .dontMock('../mapPositionStore')
  .dontMock('../pathPositionStore')
  .dontMock('../contextPositionStore')
  .dontMock('keymirror');

describe('WindSpeedStore', () => {
  let ActionConstants = require('../../constants/constants').ActionConstants;
  let windSpeedStore;
  let dispatcher;
  let callback;

  let actionMapCenterRegister = {
    type: ActionConstants.MAP_CENTER_REGISTER
  };

  beforeEach(() => {
    windSpeedStore = require('../windSpeedStore');
    dispatcher = windSpeedStore.dispatcher;
    callback = dispatcher.register.mock.calls[2][0];
  });

  it('fetches wind speed and emits', async () => {
    let speed = 1;
    windSpeedStore.fetchWindSpeed = jest.genMockFunction().mockReturnValue(speed);
    windSpeedStore.emitChange = jest.genMockFunction();

    await callback(actionMapCenterRegister);
    expect(windSpeedStore.data.windSpeed).toBe(speed);
    expect(windSpeedStore.emitChange).toBeCalled();
  });
});
