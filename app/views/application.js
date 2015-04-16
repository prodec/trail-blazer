import Ember from 'ember';

export default Ember.View.extend({
  classNames: ['content'],

  initLeaflet: function () {
    this.get('leaflet').attachTo('.content')
  }.on('didInsertElement')
});
