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

  var StaticModule = function(StaticModule, App, Backbone, Marionette, $, _) {
    StaticModule.Router = Backbone.Marionette.AppRouter.extend({
      appRoutes: {
        '!/page/:slug': 'page'
      }
    });

    var routeController = {
      page: function(slug) {
        console.log("Showing page for", slug);
      }
    };

    App.on('before:start', function() {
      var router = new StaticModule.Router({
        controller: routeController
      });
    });
  };

  return StaticModule;
});
