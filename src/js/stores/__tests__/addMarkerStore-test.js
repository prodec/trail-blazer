jest
  .dontMock('../store')
  .dontMock('../addMarkerStore')
  .dontMock('keymirror');

describe('AddMarkerStore', () => {
  let ActionConstants = require('../../constants/constants').ActionConstants;
  let addMarkerStore, dispatcher, callback; 
  let marker = new Object();

  let actionAddMarker = {
    type: ActionConstants.ADD_MARKER,
    marker
  };

  beforeEach(() => {
    addMarkerStore = require('../addMarkerStore');
    dispatcher = addMarkerStore.dispatcher;
    callback = dispatcher.register.mock.calls[0][0];
  });

  it('add a marker on the queue to be added on map', () => {
    callback(actionAddMarker);
    expect(addMarkerStore.getState().markerToAdd).toEqual(marker);
  });
});
