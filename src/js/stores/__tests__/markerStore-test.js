jest
  .dontMock('../store')
  .dontMock('../markerStore')
  .dontMock('keymirror');

describe('MarkerStore', () => {
  let ActionConstants = require('../../constants/constants').ActionConstants;
  let Marker, markerStore, dispatcher, callback;

  const marker = {};
  const content = 'content';
  const id = 1;

  let actionAddMarker = {
    type: ActionConstants.ADD_MARKER,
    marker
  };

  let actionUpdateMarker = {
    type: ActionConstants.UPDATE_MARKER,
    marker,
    content
  };

  let actionRemoveMarker = {
    type: ActionConstants.REMOVE_MARKER,
    marker
  };

  beforeEach(() => {
    markerStore = require('../markerStore');
    Marker = require('../../utils/marker');
    dispatcher = markerStore.dispatcher;
    callback = dispatcher.register.mock.calls[0][0];
    Marker.idOnMap.mockReturnValue(id);
  });

  it('adds a marker', () => {
    let storedMarkers = markerStore.getState().markers;
    let size = storedMarkers.size;

    callback(actionAddMarker);
    expect(storedMarkers.size).toEqual(size + 1);
  });

  it('removes a marker', () => {
    let storedMarkers = markerStore.getState().markers;
    storedMarkers.set(id, marker);
    let size = storedMarkers.size;

    callback(actionRemoveMarker);
    expect(storedMarkers.size).toEqual(size - 1);
  });

  it('updates a marker', () => {
    let storedMarkers = markerStore.getState().markers;
    storedMarkers.set(id, marker);

    callback(actionUpdateMarker);
    expect(storedMarkers.get(id).content).toEqual(content);
  });
});
