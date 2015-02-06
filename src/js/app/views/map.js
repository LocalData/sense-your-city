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
  var template = require('text!templates/popup.html');
  var breadcrumbsTemplate = require('text!templates/breadcrumbs.html');

  var mapChannel = Backbone.Wreqr.radio.channel('map');

  var MapView = Backbone.View.extend({
    map: null,
    markers: {},
    popups: [],
    template: _.template(template),
    breadcrumbsTemplate: _.template(breadcrumbsTemplate),

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
        attributionControl: false,
        scrollWheelZoom: false
      });
      L.control.attribution({ prefix: '<a href="http://localdata.com">LocalData</a>'}).addTo(this.map);
      new L.Control.Zoom({ position: 'topleft' }).addTo(this.map);

      $('.leaflet-top.leaflet-left').append('<div class="breadcrumbs"></div>');

      this.map.addControl(L.control.zoom({ position: 'topright' }));
      this.baseLayer = L.tileLayer(settings.baseLayer);
      this.map.addLayer(this.baseLayer);

      this.listenTo(mapChannel.vent, 'bread:crumb', this.breadCrumb);

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
        this.popups = [];
      }
    },

    addPopup: function(feature, layer) {
      if (feature.properties && feature.properties.name) {
        var popup = L.popup()
          .setLatLng([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
          .setContent(this.template(feature.properties));
        layer.bindPopup(popup);
        this.popups.push(popup);
        //.openOn(this.map);
        //var pop = layer.bindPopup(this.template(feature.properties));
        //console.log("Added popip", pop.openOn(this.map));
      }

      layer.on('click', function (e) {
        mapChannel.vent.trigger('click:feature', feature);
        mapChannel.vent.trigger('change:sparkline', feature);
      });
    },

    handleZoom: function() {
      // TODO
      // If zoom is lower than X, show the whole world route
      // Only change the route if we're zooming out

      // If zoom is higher than X, check if we overlap a city
      // If so, route to that city
      // Only change the route if we're zooming in
    },

    breadCrumb: function(options) {
      if (options.world === undefined) {
        $('.leaflet-top.leaflet-left .breadcrumbs').empty();
      } else {
        $('.leaflet-top.leaflet-left .breadcrumbs').html(this.breadcrumbsTemplate({
          breadcrumbs: {
            city: options.city
          }
        }));
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

      // Open the first point on the map
      this.popups[0].openOn(this.map);
      mapChannel.vent.trigger('click:feature', data[0]);
      mapChannel.vent.trigger('change:sparkline', data[0]);

      // If someone asks for the selected feature...
      mapChannel.reqres.setHandler('current-feature', function() {
        return data[0];
      });
    }
  });

  return MapView;
});
