import React from 'react/addons';
const { addons: { TestUtils } } = React;

jest
  .dontMock('../map')
  .dontMock('../../constants/constants')
  .dontMock('keymirror');

describe('Map', () => {
  describe('#componentDidMount', () => {
    let Mapz = require('../map');
    let EventConstants = require('../../constants/constants').EventConstants;
    let mapStore = require('../../stores/mapStore');
    let positionStore = require('../../stores/positionStore');
    let cursorStore = require('../../stores/cursorStore');
    let addMarkerStore = require('../../stores/addMarkerStore');
    let removeMarkerStore = require('../../stores/removeMarkerStore');
    let map;
    let addMapListenerMock;
    let addPositionListenerMock;
    let addCursorListenerMock;
    let addMarkerListenerMock;
    let removeMarkerListenerMock;

    beforeEach(() => {
      // jest couldn't mock leaflet
      Mapz.prototype.initMap = jest.genMockFunction();
      map = TestUtils.renderIntoDocument(<Mapz />);
      addMapListenerMock = mapStore.addChangeListener.mock;
      addPositionListenerMock = positionStore.addChangeListener.mock;
      addCursorListenerMock = cursorStore.addChangeListener.mock;
      addMarkerListenerMock = addMarkerStore.addChangeListener.mock;
      removeMarkerListenerMock = removeMarkerStore.addChangeListener.mock;
    });

    afterEach(() => {
      mapStore.addChangeListener.mockClear();
      positionStore.addChangeListener.mockClear();
      cursorStore.addChangeListener.mockClear();
      addMarkerStore.addChangeListener.mockClear();
      removeMarkerStore.addChangeListener.mockClear();
    });

    it('initializes map', () => {
      expect(map.initMap.mock.calls.length).toBe(1);
    });

    it('adds listener to positionStore', () => {
      expect(addPositionListenerMock.calls.length).toBeGreaterThan(0);
      expect(addPositionListenerMock.calls[0][0]).toBe(map.goToPosition);
    });

    it('adds listener to cursorStore', () => {
      expect(addCursorListenerMock.calls.length).toBeGreaterThan(0);
      expect(addCursorListenerMock.calls[0][0]).toBe(map.onChangeCursor);
    });

    it('adds listener to addMarkerStore', () => {
      expect(addMarkerListenerMock.calls.length).toBeGreaterThan(0);
      expect(addMarkerListenerMock.calls[0][0]).toBe(map.addMarkerToMap);
    });

    it('adds listener to removeMarkerStore', () => {
      expect(removeMarkerListenerMock.calls.length).toBeGreaterThan(0);
      expect(removeMarkerListenerMock.calls[0][0]).toBe(map.removeMarkerFromMap);
    });
  });
});
