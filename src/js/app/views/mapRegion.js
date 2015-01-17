/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var L = require('leaflet');
  var Marionette = require('marionette');

  // App
  var settings = require('app/settings');
  var MapView = require('app/views/map');

  // Templates
  var template = require('text!templates/mapRegion.html');


  var MapRegionView = Marionette.ItemView.extend({
    template: _.template(template),

    onAttach: function() {
      console.log(this);
      var mapView = new MapView({ id: 'map' });
    }
  });

  return MapRegionView;
});
