/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  var Router = require('app/router');

  var CityModule = function (CityModule, App, Backbone, Marionette, $, _) {
    CityModule.Router = Router;

    var api = {
      home: function() {
        console.log("Home");
      },
      city: function(city) {
        console.log("City", city);
      }
    };

    App.on('start', function () {
      var router = new CityModule.Router({
        controller: api
      });
    });
  };

  return CityModule;
});
