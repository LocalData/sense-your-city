/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');

  // App
  var Measure = require('app/models/measure');

  var MeasureCollection = Backbone.Collection.extend({
    model: Measure,

    url: 'http://localdata-sensors.herokuapp.com/api/v1/sources/ci4x0rtb9000h02tcfa5qov33/entries?startIndex=0&count=30&sort=desc',

    parse: function(entries) {
      var measures = {};

      _.each(entries, function(entry) {
        var data = _.omit(entry.data, 'location', 'airquality');
        _.each(data, function(measure, name) {
          if (!_.has(measures, name)) {
            measures[name] = {
              name: name,
              labels: [],
              values: []
            };
          }

          measures[name].labels.push(entry.timestamp);
          measures[name].values.push(measure);
        });
      });

      console.log("Returning", _.values(measures));
      return _.values(measures);
    }
  });

  return MeasureCollection;
});
