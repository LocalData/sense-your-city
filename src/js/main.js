/*jslint nomen: true */
/*globals require: true */

require.config({
    'baseUrl': 'js',

    'paths': {
      'app': 'app/app',
      'backbone': 'lib/backbone',
      'jquery': 'lib/jquery',
      'leaflet': 'lib/leaflet',
      'marionette': 'lib/backbone.marionette',
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

require(['jquery', 'app'],
  function ($, app) {
  'use strict';

  $(document).ready(function () {
    app.start();
  });
});
