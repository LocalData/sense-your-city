/*jslint nomen: true */
/*globals define: true */

define([],

function() {
  'use strict';

  var settings = {};

  settings.api = {
    baseurl: '/api'
  };

  settings.baseLayer = '//a.tiles.mapbox.com/v3/matth.map-n9bps30s/{z}/{x}/{y}.png'; // LocalData

  return settings;
});
