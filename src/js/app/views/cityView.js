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

    regions: {
      overviewRegion: '#overview-region',
      graphsRegion: '#graphs-region',
      toolsRegion: '#tools-region'
    },

    onBeforeShow: function() {
      // Get the latest stats for a random node in this city
      // TODO: use the latest stat for this city?
      var sources = _.filter(settings.sources, { city: this.model.get('properties').name });
      console.log("Using sources", sources);

      // Get the graphs
      var aggregationCollection = new AggregationCollection([], {
        type: 'sources',
        sources: _.pluck(sources, 'id'),
        op: 'mean',
        fields: settings.fieldsString,
        from: '2015-01-20T00:00:00Z',
        before: '2015-01-27T00:00:00Z',
        resolution: '6h'
      });
      aggregationCollection.on('add', function() {
        var measureCollection = new MeasureCollection(aggregationCollection.getMeasures());
        var measuresView = new MeasureCollectionView({
          collection: measureCollection
        });
        this.getRegion('graphsRegion').show(measuresView);
      }.bind(this));


      // var measuresCollection = new MeasureCollection({ id: source.id });
      // measuresCollection.fetch();
      // var measuresView = new MeasureCollectionView({
      //   collection: measuresCollection
      // });
      // this.getRegion('graphsRegion').show(measuresView);

      // Show the tools view
      var toolsView = new ToolsView({ });
      this.getRegion('toolsRegion').show(toolsView);
    }
  });

  return CityView;
});
