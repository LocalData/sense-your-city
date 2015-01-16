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
  var CityModule = require('app/cityModule');

  // Templatess
  var template = require('text!templates/home.html');

  var App = new Marionette.Application();

  App.module('CityModule', CityModule);

  App.addRegions({
    mainRegion: "#main"
  });

  App.StaticView = Marionette.ItemView.extend({
    template: template
  });

  function start(options) {
    if(Backbone.history){
      Backbone.history.start();
    }
    // var staticView = new App.StaticView();
    // App.mainRegion.show(staticView);
  }

  App.on("start", start);
  return App;
});
