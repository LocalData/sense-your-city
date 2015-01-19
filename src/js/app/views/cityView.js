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
  var MeasureModel = require('app/models/measure');
  var MeasureCollection = require('app/models/measureCollection');

  // Views
  var MeasureCollectionView = require('app/views/measureCollectionView');
  var OverviewView = require('app/views/overviewView');

  // Templates
  var template = require('text!templates/city.html');

  var CityView = Marionette.LayoutView.extend({
    template: _.template(template),

    regions: {
      overviewRegion: '#overview-region',
      graphsRegion: '#graphs-region'
    },

    onBeforeShow: function() {
      // Get the top stats
      var measure = new MeasureModel();
      measure.fetch();
      var overviewView = new OverviewView({
        model: measure
      });
      console.log(overviewView);
      this.getRegion('overviewRegion').show(overviewView);

      // Get the graphs
      var measuresCollection = new MeasureCollection();
      measuresCollection.fetch();
      var measuresView = new MeasureCollectionView({
        collection: measuresCollection
      });
      this.getRegion('graphsRegion').show(measuresView);
    }
  });

  return CityView;
});
