/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');

  // App
  var City = require('app/models/city');

  var CityCollection = Backbone.Collection.extend({
    model: City
  });

  return CityCollection;
});
