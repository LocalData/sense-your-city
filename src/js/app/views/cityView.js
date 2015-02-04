/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Chartist = require('chartist');
  var L = require('leaflet');
  var Marionette = require('marionette');
  var moment = require('moment');

  // App
  var settings = require('app/settings');
  var util = require('app/util');

  // Models
  var AggregationCollection = require('app/models/aggregationCollection');
  var EntryModel = require('app/models/entry');
  var MeasureCollection = require('app/models/measureCollection');

  // Views
  var MeasureCollectionView = require('app/views/measureCollectionView');
  var OverviewView = require('app/views/overviewView');
  var ToolsView = require('app/views/toolsView');

  // Templates
  var template = require('text!templates/city.html');

  var CityView = Marionette.LayoutView.extend({
    template: _.template(template),

    className: 'city',

    initialize: function() {
      _.bindAll(this, 'setGraphs');
    },

    regions: {
      overviewRegion: '#overview-region',
      graphsRegion: '#graphs-region',
      toolsRegion: '#tools-region'
    },

    setGraphs: function(span) {
      if (span === undefined) {
        span = 'day';
      }
      var sources = _.filter(settings.sources, { city: this.model.get('properties').name });

      var collectionOptions = {
        type: 'sources',
        sources: _.pluck(sources, 'id'),
        fields: settings.fieldsString,
        op: 'mean'
      };
      _.assign(collectionOptions, util.getTimeRange(span));

      var aggregationCollection = new AggregationCollection([], collectionOptions);
      aggregationCollection.on('ready', function() {
        var measureCollection = new MeasureCollection(aggregationCollection.getMeasures());
        var measuresView = new MeasureCollectionView({
          collection: measureCollection
        });
        this.getRegion('graphsRegion').show(measuresView);
      }.bind(this));
    },

    onBeforeShow: function() {
      // Get the latest stats for a random node in this city
      // TODO: use the latest stat for this city?

      // Get the graphs
      this.setGraphs('day');

      // Show the tools view
      var toolsView = new ToolsView({});
      toolsView.on('time:setRange', this.setGraphs);
      this.getRegion('toolsRegion').show(toolsView);
    }
  });

  return CityView;
});
