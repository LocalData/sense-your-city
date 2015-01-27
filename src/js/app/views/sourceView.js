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
      // Get the graphs
      var measuresCollection = new MeasureCollection({
        id: this.model.get('properties').id
      });
      measuresCollection.fetch();
      this.measuresView = new MeasureCollectionView({
        collection: measuresCollection
      });
      this.getRegion('graphsRegion').show(this.measuresView);

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
      toolsView.on('display:table', this.displayTable);
      toolsView.on('display:graphs', this.displayGraphs);
      toolsView.on('display:time', this.displayTime);

      this.getRegion('toolsRegion').show(toolsView);
    }
  });

  return SoureView;
});
