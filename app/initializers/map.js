import Ember from 'ember';

var Leaflet = Ember.Object.extend({
  map: null,

  initMap: function() {
    var map = new L.Map('map', { center: new L.LatLng(51.51, -0.11), zoom: 13 });
    var googleLayer = new L.Google('SATELLITE');
    map.addLayer(googleLayer);
    this.set('map', map);
  }.on('init')
});

export default {
  name: 'map',

  initialize: function (container, application) {
    container.register('leaflet:main', Leaflet);
    application.inject('view', 'leaflet', 'leaflet:main');
  }
};
