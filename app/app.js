import Ember from 'ember';
import Resolver from 'ember/resolver';
import config from './config/environment';
import loadInitializers from 'ember/load-initializers';

var App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
