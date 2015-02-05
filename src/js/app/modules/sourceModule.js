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
  var SourceModel = require('app/models/source');

  // Views
  var SourceView = require('app/views/sourceView');

  // Templates
  var sourcePopup = require('text!templates/sourcePopup.html');

  var SourceModule = function(SourceModule, App, Backbone, Marionette, $, _) {
    SourceModule.Router = Backbone.Marionette.AppRouter.extend({
      appRoutes: {
        '!/sources/:id': 'source'
      }
    });

    var routeController = {
      source: function(id) {
        // TODO: handle showing the map much better

        var rawSource = _.findWhere(settings.sources, { id: id});
        var source = new SourceModel({
          properties: rawSource,
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: rawSource.location
          }
        });

        var mapChannel = Backbone.Wreqr.radio.channel('map');
        mapChannel.vent.trigger('show:header');
        mapChannel.vent.trigger('bread:crumb', { world: true, city: source.get('properties').city });

        // Update the map
        App.mapView.addLocations([source.toJSON()], {
          template: _.template(sourcePopup)
        });

        // Show the main city data
        var sourceView = new SourceView({
          model: source
        });
        App.mainRegion.show(sourceView);

        // Show the sparklines
        mapChannel.vent.trigger('change:sparkline', source.toJSON());
      }
    };

    App.on('before:start', function() {
      var router = new SourceModule.Router({
        controller: routeController
      });
    });
  };

  return SourceModule;
});
