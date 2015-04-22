import Ember from 'ember';

var LeafletInit = Ember.Object.extend({
  map: null,

  initMap: function (options) {
    var container = Ember.$('<div/>'), map, googleLayer;

    options = options || {};

    container.attr('id', options.containerId || 'map');

    map = new L.Map(container.get(0), { center: new L.LatLng(51.51, -0.11), zoom: 13 });
    googleLayer = new L.Google('SATELLITE');
    map.addLayer(googleLayer);

    this.set('map', map);
    this.set('container', container);
  }.on('init'),

  attachTo: function ($el) {
    var container = this.get('container'),
    map = this.get('map');

    container.appendTo($el);
    map.invalidateSize(true);
  }
});

export default {
  name: 'map',

  initialize: function (container, application) {
    container.register('leaflet:main', LeafletInit);
    application.inject('component', 'leaflet', 'leaflet:main');
  }
};
