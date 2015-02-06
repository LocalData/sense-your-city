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
  var mapChannel = Backbone.Wreqr.radio.channel('map');

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
      _.bindAll(this, 'createGraphs', 'displayRange', 'forward', 'back', 'setFeature');
      this.listenTo(mapChannel.vent, 'click:feature', this.setFeature);
      // Get whatever feature is selected by default
      this.selectedFeature = mapChannel.reqres.request('current-feature');
    },

    regions: {
      overviewRegion: '#overview-region',
      graphsRegion: '#graphs-region',
      toolsRegion: '#tools-region'
    },

    ui: {
      'overview': '.overview',
      'tools': '#tools-region'
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

    displayRange: function(span) {
      // Start from now (ignore previous paging back)
      var sources = _.filter(settings.sources, { city: this.model.get('properties').name });
      var collectionOptions = {
        type: 'sources',
        sources: _.pluck(sources, 'id'),
        fields: settings.fieldsString,
        op: 'mean',
        span: span
      };
      var range = util.getTimeRange(span);
      _.assign(collectionOptions, range);
      this.createGraphs(collectionOptions);
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

    onShow: function() {
      // Turn the tools fixed when we scroll far enough.
      var overviewPosition = this.ui.overview.position().top;
      var overviewHeight = this.ui.overview.outerHeight();

      var fixed = false;
      window.onscroll = function() {
        if (!fixed) {
          // If it's not already fixed
          if (window.pageYOffset >= overviewPosition) {
            this.ui.overview.addClass('fixed');
            this.ui.tools.addClass('fixed');
            this.ui.tools.css({ top: overviewHeight + 'px'});
            fixed = true;
          }
        } else {
          if (window.pageYOffset < overviewPosition) {
            this.ui.overview.removeClass('fixed');
            this.ui.tools.removeClass('fixed');
            fixed = false;
          }
        }
      }.bind(this);
    },

    onBeforeShow: function() {
      // Get the latest stats for a random node in this city
      // TODO: use the latest stat for this city?

      // Get the graphs
      this.displayRange('day');

      // Show the tools view
      var toolsView = new ToolsView({});
      toolsView.on('time:setRange', this.displayRange);
      this.getRegion('toolsRegion').show(toolsView);
    }
  });

  return CityView;
});
