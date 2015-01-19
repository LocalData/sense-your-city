/*jslint nomen: true */
/*globals define: true */

define([],

function() {
  'use strict';

  var settings = {};

  settings.api = {
    baseurl: '/api'
  };

  settings.baseLayer = '//a.tiles.mapbox.com/v3/matth.01691638/{z}/{x}/{y}.png'; // LocalData

  settings.geojsonMarkerOptions = {
    radius: 10,
    fillColor: "#f07caa",
    color: "#a21c51",
    weight: 3,
    opacity: 1,
    fillOpacity: 1
  };

  settings.cities = [{
    properties: {
      name: 'Bangalore'
    },
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [77.594563, 12.971599]
    }
  },{
    properties: {
      name: 'Boston'
    },
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-71.05888, 42.360082]
    }
  },{
    properties: {
      name: 'Geneva'
    },
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [6.142296, 46.198392]
    }
  },{
    properties: {
      name: 'Rio de Janeiro'
    },
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-43.172896, -22.906847]
    }
  },{
    properties: {
      name: 'San Francisco'
    },
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-122.419416, 37.774929]
    }
  },{
    properties: {
      name: 'Shanghai'
    },
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [121.473701, 31.230416]
    }
  },{
    properties: {
      name: 'Singapore'
    },
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [103.819836, 1.352083]
    }
  }];

  return settings;
});
