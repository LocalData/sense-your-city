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
  var CityCollection = require('app/models/cityCollection');
  var MeasureCollection = require('app/models/measureCollection');

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
      // Get graphs for each city
      var source = _.findWhere(settings.sources, { id: 'ci4ooqbyw0001021o7p4qiedw' });
      var measuresCollection = new MeasureCollection({ source: source.id });
      measuresCollection.fetch();

      var aggregationCollection = new AggregationCollection([], {
        type: 'cities',
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

      // Show the tools view
      var cityCollection = new CityCollection(settings.cities);
      var toolsView = new ToolsView({
      });
      toolsView.on("childview:select:city", function(args){
        console.log("City selected", args);
      });
      this.getRegion('toolsRegion').show(toolsView);
    }
  });

  return HomeView;
});
