/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var L = require('leaflet');

  // App
  var settings = require('app/settings');

  var MapView = Backbone.View.extend({
    map: null,
    markers: {},

    initialize: function(options) {
      L.Icon.Default.imagePath = '/js/lib/leaflet/images';
      this.id = options.id || 'map';
      this.render();
    },

    render: function() {
      this.map = new L.map(this.id, {
        zoom: 15,
        center: [37.77585785035733, -122.41362811351655],
        zoomControl: false
      });

      this.map.addControl(L.control.zoom({ position: 'topright' }));
      this.baseLayer = L.tileLayer(settings.baseLayer);
      this.map.addLayer(this.baseLayer);

      return this;
    }
  });

  return MapView;
});
