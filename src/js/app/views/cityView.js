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
  var MeasureModel = require('app/models/measure');
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

    regions: {
      overviewRegion: '#overview-region',
      graphsRegion: '#graphs-region',
      toolsRegion: '#tools-region'
    },

    onBeforeShow: function() {
      // Get the latest stats
      var entry = new EntryModel();
      entry.fetch();
      var overviewView = new OverviewView({
        model: entry
      });

      entry.on("sync", function(){
        this.getRegion('overviewRegion').show(overviewView);
      }.bind(this));


      // Get the graphs
      // First, get the stats for each of the
      var measuresCollection = new MeasureCollection();
      measuresCollection.fetch();
      var measuresView = new MeasureCollectionView({
        collection: measuresCollection
      });
      this.getRegion('graphsRegion').show(measuresView);

      // Show the tools view
      var toolsView = new ToolsView({
      });
      this.getRegion('toolsRegion').show(toolsView);
    }
  });

  return CityView;
});
