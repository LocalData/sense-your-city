/*jslint nomen: true */
/*globals require: true */

require.config({
    'baseUrl': 'js',

    'paths': {
      'backbone': 'lib/backbone',
      'chartist': 'lib/chartist',
      'jquery': 'lib/jquery',
      'leaflet': 'lib/leaflet',
      'marionette': 'lib/backbone.marionette',
      'moment': 'lib/moment.min',
      'text': 'lib/text',
      'underscore': 'lib/lodash.underscore' // Backbone needs "underscore"
    },

    'shim': {
      'leaflet': {
        exports: 'L'
      },

      backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },

      marionette: {
       deps: ['backbone', 'underscore'],
       exports: 'Marionette'
      }
    }
});

require(['jquery', 'app/app'],
  function ($, app) {
  'use strict';

  $(document).ready(function () {
    app.start();
  });
});
