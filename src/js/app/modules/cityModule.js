/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var _ = require('underscore');

  // App
  var settings = require('app/settings');
  var util = require('app/util');

  // Models
  var AggregationCollection = require('app/models/aggregationCollection');
  var MeasureCollection = require('app/models/measureCollection');
  var CityModel = require('app/models/city');

  // Views
  var CityView = require('app/views/cityView');

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
        mapChannel.vent.trigger('bread:crumb', { world: true });

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
        mapChannel.vent.trigger('change:sparkline', city.toJSON());
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
