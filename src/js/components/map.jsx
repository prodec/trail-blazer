import React from 'react';
import GoogleLeaflet from '../lib/google';
import Actions from '../actions/actions';
import '../stores/mapStore';

export default class Map extends React.Component {
  componentDidMount() {
    L.Icon.Default.imagePath = '//cdn.leafletjs.com/leaflet-0.7.3/images';
    let map = new L.Map('map', { center: new L.LatLng(51.51, -0.11), zoom: 17 });
    map.addLayer(new GoogleLeaflet('SATELLITE'));
    Actions.addMap(map);
  }

  render() {
    return <div id="map"></div>;
  }
}
