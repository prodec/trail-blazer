jest
  .dontMock('../actions')
  .dontMock('keymirror');

describe('Actions', () => {
  let Actions = require('../actions');
  let ActionConstants = require('../../constants/constants').ActionConstants;
  let dispatcher = require('../../dispatcher/dispatcher');

  afterEach(() => {
    dispatcher.handleAction.mockClear();
  });

  it(`creates ${ActionConstants.CHANGE_CURSOR} action`, () => {
    Actions.changeCursor({});
    expectCommon();
  });

  it(`creates ${ActionConstants.CHANGE_MODE} action`, () => {
    Actions.changeMode({});
    expectCommon();
  });

  it(`creates ${ActionConstants.ADD_MARKER} action`, () => {
    Actions.addMarker({});
    expectCommon();
  });

  it(`creates ${ActionConstants.ADD_MAP} action`, () => {
    Actions.addMap({});
    expectCommon();
  });

  it(`creates ${ActionConstants.GO_TO} action`, () => {
    Actions.goToCoordinate({});
    expectCommon();
  });

  let expectCommon = () => {
    expect(dispatcher.handleAction.mock.calls.length).toBe(1);
  };
});
