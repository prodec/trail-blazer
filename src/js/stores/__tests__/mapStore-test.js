jest
  .dontMock('../store')
  .dontMock('../mapStore')
  .dontMock('keymirror');

describe('MapStore', () => {
  let ActionConstants = require('../../constants/constants').ActionConstants;
  let mapStore, dispatcher, callback;

  const map = new Object();

  let actionAddMap = {
    type: ActionConstants.ADD_MAP,
    map
  };

  beforeEach(() => {
    mapStore = require('../mapStore');
    dispatcher = mapStore.dispatcher;
    callback = dispatcher.register.mock.calls[0][0];
  });

  it('adds a map', () => {
    callback(actionAddMap);
    expect(mapStore.getState().map).toEqual(map);
  });
});
