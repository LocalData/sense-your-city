/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  var settings = require('app/settings');
  var util = require('app/util');

  // Models
  var AggregationCollection = require('app/models/aggregationCollection');
  var MeasureCollection = require('app/models/measureCollection');
  var CityModel = require('app/models/city');

  // Views
  var HomeView = require('app/views/homeView');
  var MeasureCollectionView = require('app/views/measureCollectionView');

  var HomeModule = function(HomeModule, App, Backbone, Marionette, $, _) {
    var mapChannel = Backbone.Wreqr.radio.channel('map');

    HomeModule.Router = Backbone.Marionette.AppRouter.extend({
      appRoutes: {
        '': 'home',
        '!': 'home',
        '!/': 'home'
      }
    });

    var routeController = {
      home: function() {
        App.mapView.addLocations(settings.cities);

        var homeView = new HomeView({});
        App.mainRegion.show(homeView);

        // XXX TODO: handle showing the map much better
        var mapChannel = Backbone.Wreqr.radio.channel('map');
        mapChannel.vent.trigger('show:header');

        // Show sparklines
        // Show the sparkline of a random source in this city
        // changeSparkline({ properties: { name: 'San Francisco'}});
        // mapChannel.vent.on('click:feature', changeSparkline);
        mapChannel.vent.trigger('change:sparkline', { properties: { name: 'San Francisco'}});
        mapChannel.vent.trigger('bread:crumb', {});
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
