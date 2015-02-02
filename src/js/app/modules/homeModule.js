/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  var settings = require('app/settings');

  // Models
  var AggregationCollection = require('app/models/aggregationCollection');
  var MeasureCollection = require('app/models/measureCollection');
  var CityModel = require('app/models/city');

  // Views
  var HomeView = require('app/views/homeView');
  var MeasureCollectionView = require('app/views/measureCollectionView');
  var SparklineCollectionView = require('app/views/sparklineCollectionView');

  var HomeModule = function(HomeModule, App, Backbone, Marionette, $, _) {
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

        // Show sparklines
        // Show the sparkline of a random source in this city
        var city = new CityModel({ properties: { name: 'San Francisco'}});

        // Show the sparkline of the city
        var collectionOptions = {
          type: 'cities',
          cities: [city.toJSON()],
          op: 'mean',
          fields: settings.fieldsString,
          from: '2015-01-20T00:00:00Z',
          before: '2015-01-27T00:00:00Z',
          resolution: '6h'
        };

        var aggregationCollection = new AggregationCollection([], collectionOptions);
        aggregationCollection.on('add', function() {
          var measureCollection = new MeasureCollection(aggregationCollection.getMeasures());
          console.log("Got measures", measureCollection.toJSON());
          var sparklineView = new SparklineCollectionView({
            model: city,
            collection: measureCollection
          });
          App.sparklineRegion.show(sparklineView);
        }.bind(this));

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
