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
      _.bindAll(this, 'addPopup', 'addLocations');
      L.Icon.Default.imagePath = '/js/lib/leaflet/images';
      this.id = options.id || 'map';
      this.render();
    },

    render: function() {
      this.map = new L.map(this.id, {
        zoom: 15,
        center: [37.77585785035733, -122.41362811351655],
        zoomControl: false,
        attributionControl: 'LocalData'
      });

      this.map.addControl(L.control.zoom({ position: 'topright' }));
      this.baseLayer = L.tileLayer(settings.baseLayer, { attribution: 'LocalData' });
      this.map.addLayer(this.baseLayer);

      return this;
    },

    // Add a buffer to a bounds object.
    bufferedBounds: function() {
      var bounds = this.layer.getBounds();

      var sw = bounds.getSouthWest();
      var ne = bounds.getNorthEast();

      var lngDiff = ne.lng - sw.lng;
      var latDiff = ne.lat - sw.lat;

      var lngMod = lngDiff / 2;
      var latMod = latDiff / 2;

      var newSW = new L.LatLng(sw.lat - latMod, sw.lng - lngMod);
      var newNE = new L.LatLng(ne.lat + latMod, ne.lng + lngMod);

      console.log("setting new bounds", sw, ne, newSW, newNE);
      return new L.LatLngBounds(newSW, newNE);
    },

    clear: function() {
      if (this.layer) {
        this.map.removeLayer(this.layer);
      }
    },

    addPopup: function(feature, layer) {
      if (feature.properties && feature.properties.name) {
        layer.bindPopup(this.template(feature.properties));
      }
    },

    addLocations: function(data, options) {
      if (options && options.template) {
        this.template = options.template;
      } else {
        this.template = _.template(template);
      }

      this.clear();
      this.layer = L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, settings.geojsonMarkerOptions);
        },
        onEachFeature: this.addPopup
      }).addTo(this.map);
      // this.map.fitBounds(this.bufferedBounds());
      this.map.fitBounds(this.layer.getBounds());
    }
  });

  return MapView;
});
