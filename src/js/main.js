/*jslint nomen: true */
/*globals require: true */

require.config({
    'baseUrl': 'js/lib',

    'paths': {
      'app': '../app',
      'underscore': 'lodash.underscore', // Backbone needs "underscore"
      'marionette': 'backbone.marionette'
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

require(['jquery', '../app/app'],
  function ($, app) {
  'use strict';

  $(document).ready(function () {
    app.start();
  });
});
