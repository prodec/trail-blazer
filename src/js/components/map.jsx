import React from 'react';
import L from 'leaflet';
import constants from '../constants/constants';
import GoogleLeaflet from '../plugins/google';

export default React.createClass({
  loadMap: function() {
    L.Icon.Default.imagePath = '//cdn.leafletjs.com/leaflet-0.7.3/images';
    var map = new L.Map('map', { center: new L.LatLng(51.51, -0.11), zoom: 13 })
    map.addLayer(new GoogleLeaflet('SATELLITE'));
  },

  componentDidMount: function() {
    this.loadMap();
  },

  render: function() {
    return (
      <div id='map'></div>
    )
  }
});
