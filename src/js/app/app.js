/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Marionette = require('marionette');

  // App
  var settings = require('app/settings');

  // Modules & Views
  var HomeModule = require('app/modules/homeModule');
  var CityModule = require('app/modules/cityModule');
  var SourceModule = require('app/modules/sourceModule');
  var MapView = require('app/views/map');

  // Templates
  var template = require('text!templates/home.html');


  var App = new Marionette.Application();

  App.addRegions({
    sparklineRegion: "#sparkline-region",
    mainRegion: "#main-region"
  });

  App.module('HomeModule', HomeModule);
  App.module('CityModule', CityModule);
  App.module('SourceModule', SourceModule);

  // Wait for the app to start
  function start(options) {
    if(Backbone.history){
      Backbone.history.start();
    }
  }

  // Start the map region before anything else
  App.on('before:start', function() {
    App.mapView = new MapView({ id: 'map' });
  });

  App.on("start", start);
  return App;
});
