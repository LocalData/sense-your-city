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
  var HomeView = require('app/views/homeView');
  var MeasureCollectionView = require('app/views/measureCollectionView');
  var SparklineCollectionView = require('app/views/sparklineCollectionView');

  var SparklineModule = function(HomeModule, App, Backbone, Marionette, $, _) {
    var mapChannel = Backbone.Wreqr.radio.channel('map');

    var changeSparkline = function(feature) {
      var model;

      var collectionOptions = {
        op: 'mean',
        fields: settings.fieldsString
      };

      if(feature.properties.id) {
        // If this is a source feature
        model = new SourceModel(feature);
        collectionOptions.type = 'sources';
        collectionOptions.sources = [feature.properties.id];
      } else {
        // If this is a city feature
        model = new CityModel(feature);
        collectionOptions.cities = [model.toJSON()];
        collectionOptions.type = 'cities';
      }

      _.assign(collectionOptions, util.getTimeRange('day'));

      var aggregationCollection = new AggregationCollection([], collectionOptions);
      var measureCollection = new MeasureCollection(settings.blankMeasures);
      var sparklineView = new SparklineCollectionView({
        model: model,
        collection: measureCollection
      });
      App.sparklineRegion.show(sparklineView);

      aggregationCollection.on('ready', function() {
        measureCollection.reset(aggregationCollection.getMeasures());
      }.bind(this));
    };

    mapChannel.vent.on('change:sparkline', changeSparkline);
  };

  return SparklineModule;
});
