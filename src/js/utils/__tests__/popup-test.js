import React from 'react/addons';

jest
  .dontMock('../popup')
  .dontMock('../../components/popupContent');

describe('Popup', () => {
  let Popup = require('../popup');

  it('binds the popup to the marker and open it', () => {
    let marker = {};
    let leafletPopup = {};

    leafletPopup.openPopup = jest.genMockFunction();
    marker.bindPopup = jest.genMockFunction().mockReturnValue(leafletPopup);
    React.render = jest.genMockFunction();

    let popup = new Popup(marker, 'text', 1);
    popup.bindOnMarker();
    expect(marker.bindPopup).toBeCalledWith(popup.body,
                                            popup.options);
  });
});
