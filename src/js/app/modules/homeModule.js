/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  var settings = require('app/settings');

  // Models
  var MeasureCollection = require('app/models/measureCollection');

  // Views
  var MeasureView = require('app/views/measure');
  var MeasureCollectionView = require('app/views/measureCollectionView');

  // Templates
  var template = require('text!templates/home.html');

  var HomeModule = function(HomeModule, App, Backbone, Marionette, $, _) {
    HomeModule.Router = Backbone.Marionette.AppRouter.extend({
      appRoutes: {
        '': 'home'
      }
    });

    var routeController = {
      home: function() {
        var measuresCollection = new MeasureCollection();
        measuresCollection.fetch();
        var measuresView = new MeasureCollectionView({
          collection: measuresCollection
        });
        //console.log("Home view", measuresView.render());
        App.graphsRegion.show(measuresView);
      }
    };

    App.on('before:start', function() {
      var router = new HomeModule.Router({
        controller: routeController
      });
    });
  };

  return HomeModule;
});
