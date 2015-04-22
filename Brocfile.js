/* global require, module */
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var compileSass = require('broccoli-sass');

var app = new EmberApp();

app.import('vendor/leaflet/dist/leaflet.js');
app.import('vendor/Buttons/js/buttons.js');

app.import('vendor/font-awesome/css/font-awesome.css');
app.import('vendor/leaflet/dist/leaflet.css');
app.import('vendor/Buttons/css/buttons.min.css');

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


var sassPath = ['app/styles'];
var tree = app.toTree();
var css = compileSass(sassPath, 'app.scss', 'assets/trail-blazer.css');

module.exports = mergeTrees([tree, images, fonts, static, css], { overwrite: true });
