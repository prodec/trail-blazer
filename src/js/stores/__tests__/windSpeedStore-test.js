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
  let speed;

  let actionMapCenterRegister = {
    type: ActionConstants.MAP_CENTER_REGISTER
  };
  let actionFlightTimeUpdate = {
    type: ActionConstants.FLIGHT_TIME_UPDATE
  };

  beforeEach(() => {
    windSpeedStore = require('../windSpeedStore');
    dispatcher = windSpeedStore.dispatcher;
    callback = dispatcher.register.mock.calls[2][0];
    speed = 1;
    windSpeedStore.fetchWindSpeed = jest.genMockFunction().mockReturnValue(speed);
    windSpeedStore.emitChange = jest.genMockFunction();
  });

  describe('fetches wind speed and emits', () => {
    it(`on ${ActionConstants.MAP_CENTER_REGISTER} action`, () => {
      expectCommon(actionMapCenterRegister);
    });

    it(`on ${ActionConstants.FLIGHT_TIME_UPDATE} action`, () => {
      expectCommon(actionFlightTimeUpdate);
    });
  });

  async function expectCommon(action) {
    await callback(action);
    expect(windSpeedStore.data.windSpeed).toBe(speed);
    expect(windSpeedStore.emitChange).toBeCalled();
  }
});
