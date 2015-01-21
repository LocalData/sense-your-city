/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  var settings = require('app/settings');

  // Models
  var MeasureCollection = require('app/models/measureCollection');
  var CityModel = require('app/models/city');
  var SourceModel = require('app/models/source');

  // Views
  var SourceView = require('app/views/sourceView');
  var SparklineCollectionView = require('app/views/sparklineCollectionView');

  var SourceModule = function(SourceModule, App, Backbone, Marionette, $, _) {
    SourceModule.Router = Backbone.Marionette.AppRouter.extend({
      appRoutes: {
        '!/sources/:id': 'source'
      }
    });

    var routeController = {
      source: function(id) {
        console.log("Going to source", id);

        var rawSource = _.findWhere(settings.sources, { id: id});
        console.log("Got raw source", rawSource);
        var source = new SourceModel({
          properties: rawSource,
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: rawSource.location
          }
        });

        // Update the map
        // TODO: Just zoom to the selected source
        App.mapView.addLocations(source.toJSON());

        // Show the main city data
        var sourceView = new SourceView({
          model: source
        });
        App.mainRegion.show(sourceView);

        // Show the sparklines
        var measuresCollection = new MeasureCollection({
          id: source.get('properties').id
        });
        measuresCollection.autoUpdate();
        var sparklineView = new SparklineCollectionView({
          model: source,
          collection: measuresCollection
        });
        App.sparklineRegion.show(sparklineView);
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
