/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  var settings = require('app/settings');

  // Models
  var MeasureCollection = require('app/models/measureCollection');
  var CityModel = require('app/models/city');

  // Views
  var HomeView = require('app/views/homeView');
  var MeasureCollectionView = require('app/views/measureCollectionView');
  var SparklineCollectionView = require('app/views/sparklineCollectionView');

  var HomeModule = function(HomeModule, App, Backbone, Marionette, $, _) {
    HomeModule.Router = Backbone.Marionette.AppRouter.extend({
      appRoutes: {
        '': 'home'
      }
    });

    var routeController = {
      home: function() {
        App.mapView.addLocations(settings.cities);

        var homeView = new HomeView({});
        App.mainRegion.show(homeView);

        // Show sparklines
        var city = new CityModel({ properties: { name: 'San Francisco'}});
        var sparklineMeasuresCollection = new MeasureCollection();
        sparklineMeasuresCollection.autoUpdate();
        var sparklineView = new SparklineCollectionView({
          model: city,
          collection: sparklineMeasuresCollection
        });
        App.sparklineRegion.show(sparklineView);
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
