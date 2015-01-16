/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Marionette = require('marionette');

  var Router = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      '': 'home',
      'city/:id': 'city'
    }
  });

  return Router;
});
