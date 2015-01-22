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
  var EntryModel = require('app/models/entry');
  var EntryCollection = require('app/models/entryCollection');
  var MeasureCollection = require('app/models/measureCollection');

  // Views
  var MeasureCollectionView = require('app/views/measureCollectionView');
  var EntriesTableView = require('app/views/entriesTableView');
  var OverviewView = require('app/views/overviewView');
  var ToolsView = require('app/views/toolsView');

  // Templates
  var template = require('text!templates/city.html');

  var SoureView = Marionette.LayoutView.extend({
    template: _.template(template),

    className: 'source',

    regions: {
      overviewRegion: '#overview-region',
      graphsRegion: '#graphs-region',
      toolsRegion: '#tools-region'
    },

    onBeforeShow: function() {
      // Get the latest stats
      var entry = new EntryModel({
        id: this.model.get('properties').id
      });
      entry.fetch();
      var overviewView = new OverviewView({
        model: entry
      });

      entry.on("sync", function(){
        this.getRegion('overviewRegion').show(overviewView);
      }.bind(this));
      entry.on("change", function(){
        this.getRegion('overviewRegion').show(overviewView);
      }.bind(this));

      // Get the graphs
      var measuresCollection = new MeasureCollection();
      measuresCollection.fetch();
      var measuresView = new MeasureCollectionView({
        collection: measuresCollection
      });
      this.getRegion('graphsRegion').show(measuresView);

      // Create a tableView, but don't display it yet
      var entryCollection = new EntryCollection({
        id: this.model.get('properties').id
      });
      entryCollection.fetch();
      var entriesView = new EntriesTableView({
        collection: entryCollection
      });

      // Show the tools view
      // TODO
      // break out a bit
      var toolsView = new ToolsView({ });
      toolsView.on('display:table', function(args) {
        this.getRegion('graphsRegion').show(entriesView, {preventDestroy: true});
      }.bind(this));
      toolsView.on('display:graphs', function(args) {
        this.getRegion('graphsRegion').show(measuresView, {preventDestroy: true});
      }.bind(this));
      this.getRegion('toolsRegion').show(toolsView);
    }
  });

  return SoureView;
});
