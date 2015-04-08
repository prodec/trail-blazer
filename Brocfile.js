/* global require, module */
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('vendor/leaflet/dist/leaflet.js');
app.import('vendor/leaflet/dist/leaflet.css');

var images = pickFiles('vendor/leaflet/dist/images', {
  srcDir: '/',
  files: ['*'],
  destDir: '/assets/images'
});

var static = pickFiles('static', {
  srcDir: '/',
  files: ['*'],
  destDir: '/assets'
});

module.exports = mergeTrees([app.toTree(), images, static]);
