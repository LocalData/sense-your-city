/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var $ = require('jquery');
  var _ = require('underscore');
  var async = require('async');
  var Backbone = require('backbone');

  // App
  var settings = require('app/settings');
  var Aggregation = require('app/models/aggregation');

  var AggregationCollection = Backbone.Collection.extend({
    model: Aggregation,

    initialize: function(data, options) {
      _.bindAll(this, 'getDataForURL', 'ready');
      console.log("Init", options);
      this.options = options;

      if(options.type === 'world') {
        this.createWorldModels();
      }
    },

    // Fetch the aggreation at a given URL
    // Create a model with the data and add it to this collection
    getDataForURL: function(url) {
      var req = $.get(url).done(function(data){
        console.log("Got aggregation", data);
        this.add({ data: data }, { parse: true});
      }.bind(this)).fail(function(error){
        console.log("Error getting aggregation", error);
      });
    },

    // Get an aggregation for every city in the world
    createWorldModels: function() {
      var params, url, urls;
      urls = [];

      // Generate a list of URLs from the list of cities.
      _.each(settings.cities, function(city) {
        var options = this.options;
        options.city = city.properties.name;
        params = $.param(options);
        url = 'http://localdata-sensors-beta.herokuapp.com/api/v1/aggregations?' + params;
        urls.push(url);
      }.bind(this));

      // Get the data for all of the aggregations.
      _.each(urls.slice(4,6), this.getDataForURL);

      // Alternatively, we can wait until all the data is loaded:
      // async.each(urls, this.getDataForURL, this.ready);
    },

    ready: function() {
      console.log("It's ready");
      this.trigger('ready');
    },

    getMeasures: function() {
      var measures = {};

      this.each(function(data) {
        console.log("Processing data", data);
        _.each(data.toJSON(), function(measure, name) {
          if (!_.has(measures, name)) {
            measures[name] = {
              name: name,
              meta: settings.measureLabels[name],
              labels: measure.labels,
              values: [],
              sources: []
            };
          }
          measures[name].values.push({
            name: measure.source,
            data: measure.values
          });
        });
      });

      // console.log("Got measures converted:", measures);
      return _.values(measures);
    }

  });

  return AggregationCollection;
});
