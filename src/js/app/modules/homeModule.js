/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  var MapRegionView = require('app/views/mapRegion');
  var template = require('text!templates/home.html');

  var HomeModule = function(HomeModule, App, Backbone, Marionette, $, _) {
    HomeModule.Router = Backbone.Marionette.AppRouter.extend({
      appRoutes: {
        '': 'home'
      }
    });

    var routeController = {
      home: function() {
        // Set up the map
        var mapRegionView = new MapRegionView();
        App.mapRegion.show(mapRegionView);

        // TODO: Set up the graphs
      }
    };

    App.on('before:start', function() {
      var router = new HomeModule.Router({
        controller: routeController
      });
    });
  };

  return HomeModule;
});
