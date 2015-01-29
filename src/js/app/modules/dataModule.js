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

  var DataModule = function(DataModule, App, Backbone, Marionette, $, _) {
    DataModule.Router = Backbone.Marionette.AppRouter.extend({
      appRoutes: {
        '!/data': 'home',
        '!/data/cities/:city': 'home',
        '!/data/cities/:city/sources/:source': 'home'
      }
    });

    var routeController = {
      home: function(city, source) {
        console.log("Showing data page for", city, source);
        // App.homeRegion.show(sparklineView);
      }
    };

    App.on('before:start', function() {
      var router = new DataModule.Router({
        controller: routeController
      });
    });
  };

  return DataModule;
});
