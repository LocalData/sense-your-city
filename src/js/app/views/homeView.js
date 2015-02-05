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

  // App
  var settings = require('app/settings');
  var util = require('app/util');
  var mapChannel = Backbone.Wreqr.radio.channel('map');

  // Models
  var AggregationCollection = require('app/models/aggregationCollection');
  var CityCollection = require('app/models/cityCollection');
  var MeasureCollection = require('app/models/measureCollection');

  // Views
  var MeasureCollectionView = require('app/views/measureCollectionView');
  var ToolsView = require('app/views/toolsView');

  // Templates
  var template = require('text!templates/home.html');

  var HomeView = Marionette.LayoutView.extend({
    template: _.template(template),

    className: 'home',

    regions: {
      graphsRegion: '#graphs-region',
      toolsRegion: '#tools-region'
    },

    initialize: function() {
      _.bindAll(this, 'displayRange', 'createGraphs', 'back', 'forward', 'setFeature');
      this.listenTo(mapChannel.vent, 'click:feature', this.setFeature);
    },

    setFeature: function(feature) {
      // Keep track of the selected feature in case we page forward/backward
      this.selectedFeature = feature;
    },

    createGraphs: function(options) {
      this.lastRange = options;
      mapChannel.vent.trigger('graphs:loading', this.selectedFeature);
      var aggregationCollection = new AggregationCollection([], options);
      aggregationCollection.on('ready', function() {
        var measureCollection = new MeasureCollection(aggregationCollection.getMeasures());
        var measuresView = new MeasureCollectionView({
          collection: measureCollection
        });
        measuresView.on('childview:time:back', this.back);
        measuresView.on('childview:time:forward', this.forward);
        this.getRegion('graphsRegion').show(measuresView);

        // If we have a selected feature, make sure it gets reselected
        if(this.selectedFeature) {
          mapChannel.vent.trigger('click:feature', this.selectedFeature);
        }
      }.bind(this));
    },

    back: function() {
      var range = util.stepBack(this.lastRange);
      _.assign(this.lastRange, range);
      this.createGraphs(this.lastRange);
    },

    forward: function() {
      console.log("Going forward");
      var range = util.stepForward(this.lastRange);
      _.assign(this.lastRange, range);
      this.createGraphs(this.lastRange);
    },

    displayRange: function(span) {
      // Start from now (ignore previous paging back)
      var collectionOptions = {
        type: 'cities',
        cities: settings.cities,
        fields: settings.fieldsString,
        op: 'mean',
        span: span
      };
      var range = util.getTimeRange(span);
      _.assign(collectionOptions, range);
      this.createGraphs(collectionOptions);
    },

    onBeforeShow: function() {
      // Get the graphs
      this.displayRange('day');

      // Show the tools view
      var toolsView = new ToolsView({});
      toolsView.on('time:setRange', this.displayRange);
      this.getRegion('toolsRegion').show(toolsView);
    }
  });

  return HomeView;
});
