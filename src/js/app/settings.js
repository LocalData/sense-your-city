/*jslint nomen: true */
/*globals define: true */

define([],

function() {
  'use strict';

  var settings = {};

  settings.delay = 10000; // ms between entries

  settings.api = {
    baseurl: '/api'
  };

  settings.baseLayer = '//{s}.tiles.mapbox.com/v3/matth.01691638/{z}/{x}/{y}.png'; // LocalData

  settings.geojsonMarkerOptions = {
    radius: 10,
    fillColor: "#f07caa",
    color: "#a21c51",
    weight: 3,
    opacity: 1,
    fillOpacity: 1
  };

  settings.measureLabels = {
    'airquality_raw': {
      name: 'Air quality',
      units: 'mV'
    },
    'dust': {
      name: 'Dust',
      units: 'mVpcs/238mL'
    },
    'humidity': {
      name: 'Humidity',
      units: '%'
    },
    'light': {
      name: 'Light',
      units: 'Lux'
    },
    'sound': {
      name: 'Sound',
      units: 'mV'
    },
    'temperature': {
      name: 'Temp',
      units: 'C'
    },
    'uv': {
      name: 'Uv',
      units: 'mV'
    }
  };

  settings.fakeSF = {
    name: "San Francisco",
    sensors: [{
      properties: {
        name: 'mapsense',
        id: 'ci4usvryz000202s7llxjafaf'
      },
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.413782, 37.775660]
      }
    },{
      properties: {
        name: 'ClimateNinja9000',
        id: 'ci4yf50s5000c03zzt4h2tnsq'
      },
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.433497, 37.769870]
      }
    },{
      properties: {
        name: 'DataDonut',
        id: 'ci54gryz30003032pmcjifsqi'
      },
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.394303, 37.782413]
      }
    },{
      properties: {
        name: 'a-streetcar-named-desire',
        id: 'ci4vuo52c000j02s7rrrjlake'
      },
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.511216, 37.760082]
      }
    }]
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
