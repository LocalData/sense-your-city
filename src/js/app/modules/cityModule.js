/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var _ = require('underscore');

  // App
  var settings = require('app/settings');

  // Models
  var MeasureCollection = require('app/models/measureCollection');
  var CityModel = require('app/models/city');

  // Views
  var CityView = require('app/views/cityView');
  var SparklineCollectionView = require('app/views/sparklineCollectionView');

  // Templates
  var sourcePopup = require('text!templates/sourcePopup.html');


  // TODO
  // This will be replaced with a real list of sensors, properly formatted
  function prepSources(city) {
    var sensors = settings.sources;
    var geojson = [];
    sensors = _.where(sensors, { city: city });
    console.log("Working with", sensors);

    _.each(sensors, function(sensor, index) {
      var geo = {
        properties: sensor,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: sensor.location
        }
      };
      geojson.push(geo);
    });

    console.log("Got geojson", geojson);
    return geojson;
  }

  var CityModule = function(CityModule, App, Backbone, Marionette, $, _) {
    CityModule.Router = Backbone.Marionette.AppRouter.extend({
      appRoutes: {
        '!/cities/:name': 'city'
      }
    });

    var routeController = {
      city: function(name) {
        console.log("Going to city", name);


        // Update the map
        var sensors = prepSources(name);
        App.mapView.addLocations(sensors, {
          template: _.template(sourcePopup)
        });


        // Show the main city data
        // TODO
        // Get the city from settings
        var city = new CityModel({
          properties: {
            name: name
          }
        });
        var cityView = new CityView({
          model: city
        });
        App.mainRegion.show(cityView);

        // Show the sparkline of a random source in this city
        var source = _.findWhere(settings.sources, {
          city: name
        });
        var measuresCollection = new MeasureCollection({ id: source.id });
        measuresCollection.fetch();
        var sparklineView = new SparklineCollectionView({
          model: city,
          collection: measuresCollection
        });
        App.sparklineRegion.show(sparklineView);
      }
    };

    App.on('before:start', function() {
      var router = new CityModule.Router({
        controller: routeController
      });
    });
  };

  return CityModule;
});
