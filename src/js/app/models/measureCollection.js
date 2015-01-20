/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');

  // App
  var settings = require('app/settings');
  var Measure = require('app/models/measure');

  var MeasureCollection = Backbone.Collection.extend({
    model: Measure,

    url: function() {
      return 'http://localdata-sensors.herokuapp.com/api/v1/sources/ci4rb6392000102wddchkqctq/entries?startIndex=0&count=30&sort=desc';
    },

    parse: function(entries) {
      var measures = {};

      _.each(entries, function(entry) {
        var data = _.omit(entry.data, 'location', 'airquality');
        _.each(data, function(measure, name) {
          if (!_.has(measures, name)) {
            measures[name] = {
              name: name,
              meta: settings.measureLabels[name],
              labels: [],
              values: []
            };
          }

          measures[name].labels.push(entry.timestamp);
          measures[name].values.push(measure);
        });
      });

      return _.values(measures);
    },

    autoUpdate: function() {
      this.fetch();
      var autoUpdate = _.bind(this.autoUpdate, this);
      _.delay(autoUpdate, settings.delay);
    }
  });

  return MeasureCollection;
});
