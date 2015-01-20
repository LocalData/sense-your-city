/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  var settings = require('app/settings');

  // Models
  var MeasureCollection = require('app/models/measureCollection');
  var CityModel = require('app/models/city');
  var SourceModel = require('app/models/source');

  // Views
  var CityView = require('app/views/cityView');
  var SparklineCollectionView = require('app/views/sparklineCollectionView');

  var SourceModule = function(SourceModule, App, Backbone, Marionette, $, _) {
    SourceModule.Router = Backbone.Marionette.AppRouter.extend({
      appRoutes: {
        '!/sources/:id': 'source'
      }
    });

    var routeController = {
      source: function(id) {
        console.log("Going to source", id);

        var source = new SourceModel({
          id: 'ci4x0rtb9000h02tcfa5qov33'
        });

        // Update the map
        // console.log(settings.fakeSF);
        // App.mapView.addLocations(settings.fakeSF.sensors);

        // Show the main city data
        // var city = new CityModel({name: id});
        // var cityView = new CityView({
        //   model: city
        // });
        // App.mainRegion.show(cityView);

        // Show the sparklines
        var measuresCollection = new MeasureCollection();
        measuresCollection.fetch();
        var sparklineView = new SparklineCollectionView({
          model: source,
          collection: measuresCollection
        });
        App.sparklineRegion.show(sparklineView);
      }
    };

    App.on('before:start', function() {
      var router = new SourceModule.Router({
        controller: routeController
      });
    });
  };

  return SourceModule;
});
