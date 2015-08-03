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
    let map;
    let addMapListenerMock;
    let addPositionListenerMock;

    beforeEach(() => {
      // jest couldn't mock leaflet
      Mapz.prototype.initMap = jest.genMockFunction();
      map = TestUtils.renderIntoDocument(<Mapz />);
      addMapListenerMock = mapStore.addChangeListener.mock;
      addPositionListenerMock = positionStore.addChangeListener.mock;
    });

    afterEach(() => {
      mapStore.addChangeListener.mockClear();
      positionStore.addChangeListener.mockClear();
    });

    it('initializes map', () => {
      expect(map.initMap.mock.calls.length).toBe(1);
    });

    it(`adds listener to positionStore\'s ${EventConstants.CHANGE_GO_TO} event`, () => {
      expect(addPositionListenerMock.calls.length).toBeGreaterThan(0);
      expect(addPositionListenerMock.calls[0][0]).toBe(map.goToPosition);
      expect(addPositionListenerMock.calls[0][1]).toBe(EventConstants.CHANGE_GO_TO);
    });

    it(`adds listener to mapStore\'s ${EventConstants.CHANGE_CURSOR} event`, () => {
      expect(addMapListenerMock.calls.length).toBeGreaterThan(0);
      expect(addMapListenerMock.calls[0][0]).toBe(map.onChangeCursor);
      expect(addMapListenerMock.calls[0][1]).toBe(EventConstants.CHANGE_CURSOR);
    });

    it(`adds listener to mapStore\'s ${EventConstants.ADD_MARKER} event`, () => {
      expect(addMapListenerMock.calls.length).toBeGreaterThan(0);
      expect(addMapListenerMock.calls[1][0]).toBe(map.addMarkerToMap);
      expect(addMapListenerMock.calls[1][1]).toBe(EventConstants.ADD_MARKER);
    });
    it(`adds listener to mapStore\'s ${EventConstants.REMOVE_MARKER} event`, () => {
      expect(addMapListenerMock.calls.length).toBeGreaterThan(0);
      expect(addMapListenerMock.calls[2][0]).toBe(map.removeMarkerFromMap);
      expect(addMapListenerMock.calls[2][1]).toBe(EventConstants.REMOVE_MARKER);
    });
  });
});
