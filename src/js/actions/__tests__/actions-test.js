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

  it(`creates ${ActionConstants.CHANGE_MODE} action`, () => {
    Actions.changeMode({});
    expectCommon();
  });

  it(`creates ${ActionConstants.ADD_MAP} action`, () => {
    Actions.addMap({});
    expectCommon();
  });

  it(`creates ${ActionConstants.ADD_MARKER} action`, () => {
    Actions.addMarker({});
    expectCommon();
  });

  it(`creates ${ActionConstants.REMOVE_MARKER} action`, () => {
    Actions.removeMarker({});
    expectCommon();
  });

  it(`creates ${ActionConstants.UPDATE_MARKER} action`, () => {
    Actions.updateMarker({});
    expectCommon();
  });

  it(`creates ${ActionConstants.GO_TO} action`, () => {
    Actions.goToCoordinate({});
    expectCommon();
  });

  function expectCommon() {
    expect(dispatcher.handleAction.mock.calls.length).toBe(1);
  }
});
