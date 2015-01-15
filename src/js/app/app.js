/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Marionette = require('marionette');

  // App
  var Router = require('../app/router');

  var App = Marionette.Application.extend({
    initialize: function(options) {
      console.log("Init app with options", options.container);
    }
  });

  var app = new App({container: '#app'});

  var controller = {
    "home": function() {
      console.log("home");
    }
  };

  function start(options) {
    if (Backbone.history){
      Backbone.history.start();
    }

    var r = new Router({
      controller: controller
    });
  }

  app.on("start", start);
  return app;
});
