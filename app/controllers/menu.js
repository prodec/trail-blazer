import Ember from 'ember';

export default Ember.Controller.extend({
  sessions: [ "slideout-goto",
              "slideout-marker",
              "slideout-line",
              "slideout-battery",
              "slideout-tie" ],
  buttons: [
    { id: "goto", class: "button-royal", icon: "fa-location-arrow" },
    { id: "marker", class: "button-action", icon: "fa-map-marker" },
    { id: "line", class: "button-caution", icon: "fa-share-alt" },
    { id: "battery", class: "button-highlight", icon: "fa-flag" },
    { id: "tie", class: "button-primary", icon: "fa-anchor" }
  ]
});
