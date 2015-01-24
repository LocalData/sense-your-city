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

    onBeforeShow: function() {
      // Get the graphs
      var measuresCollection = new MeasureCollection({
        id: this.model.get('properties').id
      });
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
      toolsView.on('display:time', function(args) {
        console.log("Display time", args);
      }.bind(this));
      this.getRegion('toolsRegion').show(toolsView);
    }
  });

  return SoureView;
});
