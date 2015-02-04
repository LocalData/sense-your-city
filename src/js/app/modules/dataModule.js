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
    var exportChannel = Backbone.Wreqr.radio.channel('export');

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

        // TODO: find a way to effectively hide the header region.
        var mapChannel = Backbone.Wreqr.radio.channel('map');
        mapChannel.vent.trigger('hide:header');

        // Handle scrolling to the correct position:
        var $elt, top;
        if (city) {
          $elt = $('#data-region .city .' + _.camelCase(city));
          exportChannel.vent.trigger('show:city', city);
        }

        if (source) {
          $elt = $('#data-region .source.' + _.camelCase(source));
          exportChannel.vent.trigger('show:source', source);
        }

        if (city) {
          top = $elt.position().top;
          window.scrollTo( 0, top);
        }
      }
    };

    App.on('before:start', function() {
      var router = new DataModule.Router({
        controller: routeController
      });
    });
  };

  return DataModule;
});
