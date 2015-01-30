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
      console.log("Parsing aggregation model", entries);
      entries = entries.data;
      entries = entries.reverse();

      var measures = {};

      _.each(entries, function(entry) {
        var data = _.omit(entry, settings.fieldsToOmit);
        _.each(data, function(measure, name) {
          if (!_.has(measures, name)) {
            measures[name] = {
              name: name,
              source: entry.city, // we're overloading the "source" here
                                  // and "city" will break down for sources too
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
