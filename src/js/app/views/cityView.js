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
      _.bindAll(this, 'setTimeRange', 'setGraphs');
    },

    regions: {
      overviewRegion: '#overview-region',
      graphsRegion: '#graphs-region',
      toolsRegion: '#tools-region'
    },

    setTimeRange: function(span) {
      var remainder, from, resolution;
      var before = moment();
      if(span === 'hour') {
        // Go 60 minutes back
        // Round to the nearest minute
        before.add(60, 'seconds');
        before = moment(before.format('MM-DD-YYYY HH:mm:00'), 'MM-DD-YY HH:mm:ss'); //reduce precision
        from = moment(before).subtract(60, 'minutes');
        resolution = '5m';
      } else if (span === 'day') {
        // 24 hours back
        // Round to the nearest hour
        before.add(60, 'minutes');
        before = moment(before.format('MM-DD-YYYY HH:00:00'), 'MM-DD-YY HH:mm:ss'); //reduce precision
        from = moment(before).subtract(24, 'hours');
        resolution = '1h';
      } else if (span === 'week') {
        // 7 days back
        // Round to the nearest day
        before.add(1, 'day');
        before = moment(before.format('MM-DD-YYYY 00:00:00'), 'MM-DD-YY HH:mm:ss'); //reduce precision
        from = moment(before).subtract(24, 'hours');
        resolution = '12h';
      }
      console.log("Set time", span, from.format('MM-DD-YY HH:mm:ss'), before.format('MM-DD-YY HH:mm:ss'), resolution);
      this.setGraphs({
        from: from.format(),
        before: before.format(),
        resolution: resolution
      });
    },

    setGraphs: function(options) {
      var sources = _.filter(settings.sources, { city: this.model.get('properties').name });

      var collectionOptions = {
        type: 'sources',
        sources: _.pluck(sources, 'id'),
        op: 'mean',
        fields: settings.fieldsString,
        from: '2015-01-20T00:00:00Z',
        before: '2015-01-27T00:00:00Z',
        resolution: '6h'
      };

      collectionOptions = _.assign(collectionOptions, options);

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
      this.setGraphs();

      // Show the tools view
      var toolsView = new ToolsView({});
      toolsView.on('time:setRange', this.setTimeRange);
      this.getRegion('toolsRegion').show(toolsView);
    }
  });

  return CityView;
});
