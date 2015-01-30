/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  var settings = require('app/settings');

  // Models
  var MeasureCollection = require('app/models/measureCollection');
  var CityModel = require('app/models/city');

  // Views
  var DataView = require('app/views/dataView');

  var DataModule = function(DataModule, App, Backbone, Marionette, $, _) {
    DataModule.Router = Backbone.Marionette.AppRouter.extend({
      appRoutes: {
        '!/data': 'home',
        '!/data/cities/:city': 'home',
        '!/data/cities/:city/': 'home',
        '!/data/cities/:city/sources/:source': 'home',
        '!/data/cities/:city/sources/:source/': 'home'
      }
    });

    var routeController = {
      home: function(city, source) {
        var dataView = new DataView({});
        App.mainRegion.show(dataView);

        // Handle scrolling to the correct position:
        var $elt;
        if (city) {
          $elt = $('#data-region .city .' + _.camelCase(city));
        }
        if (source) {
          $elt = $('#data-region .source .' + _.camelCase(source));
        }

        if (city) {
          var top = $elt.position().top;
          console.log("Scrolling to city", $elt, top);
          window.scrollTo( 0, top);
        }
      }
    };

    App.on('before:start', function() {
      var router = new DataModule.Router({
        controller: routeController
      });

      console.log("Header region", App.headerRegion.$el.hide());
    });
  };

  return DataModule;
});
