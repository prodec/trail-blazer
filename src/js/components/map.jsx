import React from 'react';
import constants from '../constants/constants';
import GoogleLeaflet from '../lib/google';

export default class Map extends React.Component {
  componentDidMount() {
    L.Icon.Default.imagePath = '//cdn.leafletjs.com/leaflet-0.7.3/images';
    var map = new L.Map('map', { center: new L.LatLng(51.51, -0.11), zoom: 13 })
    map.addLayer(new GoogleLeaflet('SATELLITE'));
  }

  render() {
    return (
      <div id="map"></div>
    )
  }
}
