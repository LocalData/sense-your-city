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

  // Models
  var AggregationCollection = require('app/models/aggregationCollection');
  var EntryCollection = require('app/models/entryCollection');
  var MeasureCollection = require('app/models/measureCollection');

  // Views
  var MeasureCollectionView = require('app/views/measureCollectionView');
  var EntriesTableView = require('app/views/entriesTableView');
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

    displayTime: function(action) {
      console.log("Got action", action);
    },

    displayGraphs: function() {
      console.log(this);
      this.getRegion('graphsRegion').show(this.measuresView, {preventDestroy: true});
    },

    displayTable: function() {
      console.log(this);
      this.getRegion('graphsRegion').show(this.entriesView, {preventDestroy: true});
    },

    onBeforeShow: function() {
      var collectionOptions = {
        type: 'sources',
        sources: [this.model.get('properties').id],
        op: 'mean',
        fields: settings.fieldsString,
        from: '2015-01-20T00:00:00Z',
        before: '2015-01-27T00:00:00Z',
        resolution: '6h'
      };

      var aggregationCollection = new AggregationCollection([], collectionOptions);
      aggregationCollection.on('add', function() {
        var measureCollection = new MeasureCollection(aggregationCollection.getMeasures());
        var measuresView = new MeasureCollectionView({
          collection: measureCollection
        });
        this.getRegion('graphsRegion').show(measuresView);
      }.bind(this));

      // Get the graphs
      //var measuresCollection = new MeasureCollection({
      //  id: this.model.get('properties').id
      //});
      //measuresCollection.fetch();
      //this.measuresView = new MeasureCollectionView({
      //  collection: measuresCollection
      //});
      //this.getRegion('graphsRegion').show(this.measuresView);

      // Create a tableView, but don't display it yet
      var entryCollection = new EntryCollection({
        id: this.model.get('properties').id
      });
      entryCollection.fetch();
      this.entriesView = new EntriesTableView({
        collection: entryCollection
      });

      // Create the tools view
      var toolsView = new ToolsView({ });
      toolsView.on('display:time', this.displayTime);

      this.getRegion('toolsRegion').show(toolsView);
    }
  });

  return SoureView;
});
