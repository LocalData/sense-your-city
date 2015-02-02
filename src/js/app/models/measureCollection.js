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

    initialize: function(options) {
      this.id = options.id;
      this.timerange = options.timerange;
      this.start = options.start;
      this.end = options.end;
    },

    url: function() {
      if (this.id) {
        return settings.baseUrl + 'sources/' + this.id + '/entries?startIndex=0&count=30&sort=desc';
      }

      var options = {
        op: 'mean',
        city: 'San Francisco',
        fields: settings.fieldsString,
        from: '2015-01-20T00:00:00Z',
        before: '2015-01-27T00:00:00Z',
        resolution: '20m'
      };

      var params = $.param(options);

      // Remove fallback
      console.log("Warning - using fallback URL for measure collection");
      return 'http://localdata-sensors-beta.herokuapp.com/api/v1/aggregations?' + params;
    },

    parse: function(entries) {
      var measures = {};

      entries = entries.reverse();

      _.each(entries, function(entry) {
        var data = _.omit(entry.data, 'location', 'airquality', 'uv');
        _.each(data, function(measure, name) {
          if (!_.has(measures, name)) {
            measures[name] = {
              name: name,
              meta: settings.measureLabels[name],
              labels: [],
              values: []
            };
          }

          measure = measure.toFixed(0);

          measures[name].labels.push(entry.timestamp);
          measures[name].values.push(measure);
        });
      });

      return _.values(measures);
    },

    autoUpdate: function() {
      this.fetch();
      var autoUpdate = _.bind(this.autoUpdate, this);
      // TODO
      // Re-enable autoupdate
      // _.delay(autoUpdate, settings.delay);
    }
  });

  return MeasureCollection;
});
