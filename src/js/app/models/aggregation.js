/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');

  var settings = require('app/settings');


  var Aggregation = Backbone.Model.extend({

    initialize: function(options) {
    },

    parse: function(entries) {
      entries = entries.data;

      var measures = {};

      _.each(entries, function(entry) {
        var data = _.omit(entry, settings.fieldsToOmit);
        _.each(data, function(measure, name) {
          var source = entry.city;

          // If this isn't a city, get the name of the sensor
          if (!source) {
            source = _.find(settings.sources, {id: entry.source}).name;
          }

          if (!_.has(measures, name)) {
            measures[name] = {
              name: name,
              source: source, // we're overloading "source" here
              meta: settings.measureLabels[name],
              labels: [],
              values: []
            };
          }

          measures[name].labels.push(entry.timestamp);
          measures[name].values.push(measure);
        });
      });
      return measures;
    }
  });

  return Aggregation;
});
