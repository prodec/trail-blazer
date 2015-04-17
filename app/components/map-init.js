import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['content'],

  initLeaflet: function () {
    this.get('leaflet').attachTo('.content');
  }.on('didInsertElement')
});
