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

    defaults: {
      meta: {},
      values: [],
      labels: []
    },

    parse: function(entries) {
      console.log("Parsing aggregation model", entries);
      entries = entries.data;
      var measures = {};

      entries = entries.reverse();

      _.each(entries, function(entry) {
        var data = _.omit(entry, settings.fieldsToOmit);
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
    }
  });

  return Aggregation;
});
