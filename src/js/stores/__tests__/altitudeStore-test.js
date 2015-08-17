jest
  .dontMock('../store')
  .dontMock('../altitudeStore')
  .dontMock('keymirror');

describe('AltitudeStore', () => {
  let ActionConstants = require('../../constants/constants').ActionConstants;
  let altitudeStore, dispatcher, callback;

  const latLng = [1,2];

  let actionMoveOnMap = {
    type: ActionConstants.MOUSE_MOVE_ON_MAP,
    latLng
  };

  beforeEach(() => {
    altitudeStore = require('../altitudeStore');
    dispatcher = altitudeStore.dispatcher;
    callback = dispatcher.register.mock.calls[0][0];
  });

  it('changes the latLng', () => {
    callback(actionMoveOnMap);
    expect(altitudeStore.getState().ws.requestHeight).toBeCalledWith(latLng);
  });
});
