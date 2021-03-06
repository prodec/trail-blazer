import React from 'react/addons';
const { addons: { TestUtils } } = React;

jest
  .dontMock('../map')
  .dontMock('../../constants/constants')
  .dontMock('keymirror')
  .dontMock('../../stores/store');

describe('Map', () => {
  describe('#componentDidMount', () => {
    let Mapz = require('../map');
    let mapStore = require('../../stores/mapStore');
    let goToPositionStore = require('../../stores/goToPositionStore');
    let modeStore = require('../../stores/modeStore');
    let addMarkerStore = require('../../stores/addMarkerStore');
    let removeMarkerStore = require('../../stores/removeMarkerStore');
    let map;
    let addMapListenerMock;
    let addPositionListenerMock;
    let addModeListenerMock;
    let addMarkerListenerMock;
    let removeMarkerListenerMock;

    beforeEach(() => {
      // jest couldn't mock leaflet
      Mapz.prototype.initMap = jest.genMockFunction();
      map = TestUtils.renderIntoDocument(<Mapz />);
      addMapListenerMock = mapStore.addChangeListener.mock;
      addPositionListenerMock = goToPositionStore.addChangeListener.mock;
      addModeListenerMock = modeStore.addChangeListener.mock;
      addMarkerListenerMock = addMarkerStore.addChangeListener.mock;
      removeMarkerListenerMock = removeMarkerStore.addChangeListener.mock;

    });

    afterEach(() => {
      mapStore.addChangeListener.mockClear();
      goToPositionStore.addChangeListener.mockClear();
      modeStore.addChangeListener.mockClear();
      addMarkerStore.addChangeListener.mockClear();
      removeMarkerStore.addChangeListener.mockClear();
    });

    it('initializes map', () => {
      expect(map.initMap.mock.calls.length).toBe(1);
    });

    it('adds listener to goToPositionStore', () => {
      expect(addPositionListenerMock.calls.length).toBeGreaterThan(0);
      expect(addPositionListenerMock.calls[0][0]).toBe(map.goToPosition);
    });

    it('adds listener to modeStore', () => {
      expect(addModeListenerMock.calls.length).toBeGreaterThan(0);
      expect(addModeListenerMock.calls[0][0]).toBe(map.onChangeMode);
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
