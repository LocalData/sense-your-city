/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var _ = require('underscore');

  // App
  var settings = require('app/settings');

  // Models
  var AggregationCollection = require('app/models/aggregationCollection');
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
        // TODO: handle showing the map much better
        var mapChannel = Backbone.Wreqr.radio.channel('map');
        mapChannel.vent.trigger('show:header');

        // Update the map
        var sensors = prepSources(name);
        App.mapView.addLocations(sensors, {
          template: _.template(sourcePopup)
        });

        // Show the main city data
        // TODO
        // Get the city from settings?
        var city = new CityModel({
          properties: {
            name: name
          }
        });
        var cityView = new CityView({
          model: city
        });
        App.mainRegion.show(cityView);

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
          var sparklineView = new SparklineCollectionView({
            model: city,
            collection: measureCollection
          });
          App.sparklineRegion.show(sparklineView);
        }.bind(this));

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
