/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Marionette = require('marionette');


  var App = Marionette.Application.extend({
    initialize: function(options) {
      console.log("Init app with options", options.container);
    }
  });

  var app = new App({container: '#app'});

  app.on("start", function(options){
    console.log("Starting app");
    if (Backbone.history){
      Backbone.history.start();
    }
  });

  return app;
});
