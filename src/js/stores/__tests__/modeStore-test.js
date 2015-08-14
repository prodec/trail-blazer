jest
  .dontMock('../store')
  .dontMock('../modeStore')
  .dontMock('keymirror');

describe('ModeStore', () => {
  let ActionConstants = require('../../constants/constants').ActionConstants;
  let modeStore, dispatcher, callback;

  const mode = 'mode';

  let actionChangeMode = {
    type: ActionConstants.CHANGE_MODE,
    mode: 'mode'
  };

  beforeEach(() => {
    modeStore = require('../modeStore');
    dispatcher = modeStore.dispatcher;
    callback = dispatcher.register.mock.calls[0][0];
  });

  it('sets a mode as active', () => {
    callback(actionChangeMode);
    expect(modeStore.getState().active).toEqual(mode);
  });
});
