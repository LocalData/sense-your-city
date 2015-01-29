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
  var CityModule = require('app/modules/cityModule');
  var DataModule = require('app/modules/dataModule');
  var HomeModule = require('app/modules/homeModule');
  var SourceModule = require('app/modules/sourceModule');

  var MapView = require('app/views/map');

  // Templates
  var template = require('text!templates/home.html');


  var App = new Marionette.Application();

  App.addRegions({
    sparklineRegion: '#sparkline-region',
    mainRegion: '#main-region',
    toolsRegion: '#tools-region'
  });

  App.module('HomeModule', HomeModule);
  App.module('CityModule', CityModule);
  App.module('SourceModule', SourceModule);
  App.module('DataModule', DataModule);

  // Wait for the app to start
  function start(options) {
    if(Backbone.history){
      Backbone.history.start();
    }

    // Hamburger menu toggle for mobile / responsive
    $('.hamburger').click(function(event) {
      event.preventDefault();
      $('.pure-menu ul').toggleClass('show');
    });
  }

  // Start the map region before anything else
  App.on('before:start', function() {
    App.mapView = new MapView({ id: 'map' });
  });

  App.on('start', start);
  return App;
});
