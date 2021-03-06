/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');

  var Measure = Backbone.Model.extend({
    url: 'http://localdata-sensors.herokuapp.com/api/v1/sources/ci4x0rtb9000h02tcfa5qov33/entries?startIndex=0&count=1&sort=desc',

    defaults: {
      meta: {},
      values: [],
      labels: []
    },

    isEmpty: function() {
      if (this.get('values')[0].data.length === 1) {
        return true;
      }
    }
  });

  return Measure;
});
