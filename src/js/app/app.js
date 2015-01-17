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
  var HomeModule = require('app/modules/homeModule');

  // Templates
  var template = require('text!templates/home.html');


  var App = new Marionette.Application();

  App.addRegions({
    mapRegion: "#map-region",
    graphsRegion: "#graphs-region"
  });

  App.module('HomeModule', HomeModule);

  // Wait for the app to start
  function start(options) {
    if(Backbone.history){
      Backbone.history.start();
    }
  }

  App.on("start", start);
  return App;
});
