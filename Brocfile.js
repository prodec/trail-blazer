/* global require, module */
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('vendor/leaflet/dist/leaflet.js');
app.import('vendor/leaflet/dist/leaflet.css');
app.import('vendor/Buttons/css/buttons.min.css');
app.import('vendor/Buttons/js/buttons.js');
app.import('vendor/font-awesome/css/font-awesome.css');

var images = pickFiles('vendor/leaflet/dist/images', {
  srcDir: '/',
  files: ['*'],
  destDir: '/assets/images'
});

var fonts = pickFiles('vendor/font-awesome/fonts', {
    srcDir: '/',
    files: ['*'],
    destDir: '/fonts'
});

var static = pickFiles('static', {
  srcDir: '/',
  files: ['*'],
  destDir: '/assets'
});

module.exports = mergeTrees([app.toTree(), images, fonts, static]);
