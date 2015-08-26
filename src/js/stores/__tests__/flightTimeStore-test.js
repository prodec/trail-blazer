jest
  .dontMock('../store')
  .dontMock('../flightTimeStore')
  .dontMock('keymirror');

describe('FlightTimeStore', () => {
  let ActionConstants = require('../../constants/constants').ActionConstants;
  let flightTimeStore;
  let dispatcher;
  let callback;
  let flightTime = 1;
  let utc = 2;

  let actionFlightTimeUpdate = {
    type: ActionConstants.FLIGHT_TIME_UPDATE,
    flightTime
  };
  let actionUTCRegister = {
    type: ActionConstants.UTC_REGISTER,
    utc
  };

  beforeEach(() => {
    flightTimeStore = require('../flightTimeStore');
    dispatcher = flightTimeStore.dispatcher;
    callback = dispatcher.register.mock.calls[0][0];
  });

  it(`updates flight time`, () => {
    callback(actionFlightTimeUpdate);

    expect(flightTimeStore.data.time).toBe(flightTime);
  });

  it(`changes utc offset`, () => {
    flightTimeStore.data.time = { utcOffset: jest.genMockFunction() };
    callback(actionUTCRegister);

    expect(flightTimeStore.data.time.utcOffset).toBeCalledWith(utc);
  });
});
