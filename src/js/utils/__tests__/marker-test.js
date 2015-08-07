jest
  .dontMock('../../stores/store')
  .dontMock('../marker');

describe('Marker', () => {
  let Marker, L, mapStore, map;

  const iconUrl = 'http://leafletjs.com/docs/images/leaf-green.png'; 

  beforeEach(() => {
    Marker = require('../marker');
    mapStore = require('../../stores/mapStore');
    L = require('leaflet');
    map = new L.Map('map', { center: new L.LatLng(51.51, -0.11), zoom: 17 });
  });

  it('finds the component id on map', () => {
    let marker = new Object();

    Marker.idOnMap(marker);
    expect(L.stamp).toBeCalledWith(marker);
  });

  it('intantiates a draggable leaflet marker with coordinates and icon', () => {
    mapStore.getState.mockReturnValue(map);

    let latLng = [1, 2];
    let icon = L.icon({ iconUrl });
    let options = {
      icon,
      draggable: true
    };
    let marker = new Marker(latLng, icon);

    expect(L.Marker).toBeCalledWith(latLng, options);
  });
});
