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
    let map;
    let addListenerMock;

    beforeEach(() => {
      // jest couldn't mock leaflet
      Mapz.prototype.initMap = jest.genMockFunction();
      map = TestUtils.renderIntoDocument(<Mapz />);
      addListenerMock = mapStore.addChangeListener.mock;
    });

    afterEach(() => {
      mapStore.addChangeListener.mockClear();
    });

    it('initializes map', () => {
      expect(map.initMap.mock.calls.length).toBe(1);
    });

    it(`adds listener to mapStore\'s ${EventConstants.CHANGE_GO_TO} event`, () => {
      expect(addListenerMock.calls.length).toBeGreaterThan(0);
      expect(addListenerMock.calls[0][0]).toBe(map.goToPosition);
      expect(addListenerMock.calls[0][1]).toBe(EventConstants.CHANGE_GO_TO);
    });

    it(`adds listener to mapStore\'s ${EventConstants.CHANGE_CURSOR} event`, () => {
      expect(addListenerMock.calls.length).toBeGreaterThan(0);
      expect(addListenerMock.calls[1][0]).toBe(map.onChangeCursor);
      expect(addListenerMock.calls[1][1]).toBe(EventConstants.CHANGE_CURSOR);
    });

    it(`adds listener to mapStore\'s ${EventConstants.ADD_MARKER} event`, () => {
      expect(addListenerMock.calls.length).toBeGreaterThan(0);
      expect(addListenerMock.calls[2][0]).toBe(map.addMarkerToMap);
      expect(addListenerMock.calls[2][1]).toBe(EventConstants.ADD_MARKER);
    });
  });
});
