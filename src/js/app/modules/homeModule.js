/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  var settings = require('app/settings');

  // Models
  var MeasureCollection = require('app/models/measureCollection');
  var CityModel = require('app/models/city');

  // Views
  var CityView = require('app/views/cityView');
  var MeasureCollectionView = require('app/views/measureCollectionView');

  var HomeModule = function(HomeModule, App, Backbone, Marionette, $, _) {
    HomeModule.Router = Backbone.Marionette.AppRouter.extend({
      appRoutes: {
        '': 'home',
        '!/cities/:name': 'city'
      }
    });

    var routeController = {
      home: function() {
        App.mapView.addLocations(settings.cities);

        var measuresCollection = new MeasureCollection();
        measuresCollection.fetch();
        var measuresView = new MeasureCollectionView({
          collection: measuresCollection
        });
        App.mainRegion.show(measuresView);
      },
      city: function(name) {
        console.log("Going to city", name);

        var city = new CityModel({name: name});
        var cityView = new CityView({
          model: city
        });
        App.mainRegion.show(cityView);
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
