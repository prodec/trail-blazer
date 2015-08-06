jest
  .dontMock('../store')
  .dontMock('../removeMarkerStore')
  .dontMock('keymirror');

describe('RemoveMarkerStore', () => {
  let ActionConstants = require('../../constants/constants').ActionConstants;
  let removeMarkerStore, dispatcher, callback;

  const marker = new Object();

  let actionRemoveMarker = {
    type: ActionConstants.REMOVE_MARKER,
    marker
  };

  beforeEach(() => {
    removeMarkerStore = require('../removeMarkerStore');
    dispatcher = removeMarkerStore.dispatcher;
    callback = dispatcher.register.mock.calls[0][0];
  });

  it('put a marker in the queue to be removed', () => {
    callback(actionRemoveMarker);
    expect(removeMarkerStore.getState().markerToRemove).toEqual(marker);
  });
});
