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
  var template = require('text!templates/popup.html');

  var MapView = Backbone.View.extend({
    map: null,
    markers: {},
    template: _.template(template),

    initialize: function(options) {
      _.bindAll(this, 'addPopup');
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
    },

    clear: function() {
      this.map.clearLayers();
    },

    addPopup: function(feature, layer) {
      // does this feature have a property named popupContent?
      if (feature.properties && feature.properties.name) {
          layer.bindPopup(this.template(feature.properties));
      }
    },

    addLocations: function(data) {
      var layer = L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, settings.geojsonMarkerOptions);
        },
        onEachFeature: this.addPopup
      }).addTo(this.map);
      this.map.fitBounds(layer.getBounds());
    }
  });

  return MapView;
});
