/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');

  var settings = require('app/settings');

  var Entry = Backbone.Model.extend({
    url: 'http://localdata-sensors.herokuapp.com/api/v1/sources/ci4x0rtb9000h02tcfa5qov33/entries?startIndex=0&count=1&sort=desc',

    defaults: {
      data: {}
    },

    parse: function(entry) {
      entry = entry[0];

      entry.location = entry.data.location;

      entry.data = _.omit(entry.data, 'location', 'airquality');

      _.each(entry.data, function(value, name) {
        entry.data[name] = {
          name: name,
          meta: settings.measureLabels[name],
          value: value
        };
      });
      console.log("Returning entry", entry);
      return entry;
    }
  });

  return Entry;
});
