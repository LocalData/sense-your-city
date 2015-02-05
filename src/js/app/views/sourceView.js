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
  var MeasureCollection = require('app/models/measureCollection');

  // Views
  var MeasureCollectionView = require('app/views/measureCollectionView');
  var ToolsView = require('app/views/toolsView');

  // Templates
  var template = require('text!templates/source.html');

  var SoureView = Marionette.LayoutView.extend({
    template: _.template(template),

    className: 'source',

    regions: {
      graphsRegion: '#graphs-region',
      toolsRegion: '#tools-region'
    },

    ui: {
      'overview': '.overview',
      'tools': '#tools-region'
    },

    initialize: function() {
      _.bindAll(this, 'createGraphs', 'displayRange', 'forward', 'back', 'setFeature');
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

    displayRange: function(span) {
      // Start from now (ignore previous paging back)
      var sources = _.filter(settings.sources, { city: this.model.get('properties').name });
      var collectionOptions = {
        type: 'sources',
        sources: [this.model.get('properties').id],
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
      var overviewHeight = this.ui.overview.height();

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
      // Get the graphs
      this.displayRange('day');

      // Create the tools view
      var toolsView = new ToolsView({ });
      toolsView.on('time:setRange', this.displayRange);
      this.getRegion('toolsRegion').show(toolsView);
    }
  });

  return SoureView;
});
