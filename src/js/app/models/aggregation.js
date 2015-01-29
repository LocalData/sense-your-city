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
      // console.log("Creating aggregation with options", options);
      this.fetch();
    },

    url: function() {
      console.log("Getting city aggregation", this.get('city'));
      var options = {
        op: this.get('mean'),
        city: this.get('city'),
        fields: settings.fieldsString,
        from: '2015-01-20T00:00:00Z',
        before: '2015-01-27T00:00:00Z',
        resolution: this.get('resolution')
      };

      var params = $.param(options);

      return 'http://localdata-sensors-beta.herokuapp.com/api/v1/aggregations?' + params;
    },

    defaults: {
      meta: {},
      values: [],
      labels: []
    },

    parse: function(entries) {
      console.log("Got entries", entries);
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
