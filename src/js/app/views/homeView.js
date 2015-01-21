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
  var MeasureCollection = require('app/models/measureCollection');
  var CityCollection = require('app/models/cityCollection');

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

    onBeforeShow: function() {
      // Get the graphs
      var measuresCollection = new MeasureCollection();
      measuresCollection.fetch();
      var measuresView = new MeasureCollectionView({
        collection: measuresCollection
      });
      this.getRegion('graphsRegion').show(measuresView);

      // Show the tools view
      var cityCollection = new CityCollection(settings.cities);
      var toolsView = new ToolsView({
        collection: cityCollection
      });
      toolsView.on("childview:select:city", function(args){
        // TODO
        // Highlight the graph
        console.log("City selected", args);
      });
      this.getRegion('toolsRegion').show(toolsView);

    }
  });

  return HomeView;
});
