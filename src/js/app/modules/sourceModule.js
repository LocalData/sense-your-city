/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  var settings = require('app/settings');

  // Models
  var AggregationCollection = require('app/models/aggregationCollection');
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
        // TODO: handle showing the map much better
        var mapChannel = Backbone.Wreqr.radio.channel('map');
        mapChannel.vent.trigger('show:header');

        var rawSource = _.findWhere(settings.sources, { id: id});
        var source = new SourceModel({
          properties: rawSource,
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: rawSource.location
          }
        });

        // Update the map
        App.mapView.addLocations(source.toJSON());

        // Show the main city data
        var sourceView = new SourceView({
          model: source
        });
        App.mainRegion.show(sourceView);

        // Show the sparklines
        var collectionOptions = {
          type: 'sources',
          sources: [id],
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
            model: source,
            collection: measureCollection
          });
          App.sparklineRegion.show(sparklineView);
        }.bind(this));
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
