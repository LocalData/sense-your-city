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
  var Aggreation = require('app/models/aggregation');

  var AggreationCollection = Backbone.Collection.extend({
    model: Aggreation,

    initialize: function(options) {
      _.bindAll(this, 'getModel');
      this.options = options;

      if(options.type === 'world') {
        this.createWorldModels();
      }
    },

    done: function(data){
      console.log("Got aggregation", data);
    },

    fail: function(error) {
      console.log("Error getting aggregation", error);
    },

    getModel: function(url) {
      var req = $.get(url).done(this.done).fail(this.fail);
    },

    createWorldModels: function() {
      var params, url, urls;
      urls = [];

      _.each(settings.cities, function(city) {
        var options = this.options;
        options.city = city.properties.name;
        params = $.param(options);
        url = 'http://localdata-sensors-beta.herokuapp.com/api/v1/aggregations?' + params;
        urls.push(url);
      }.bind(this));

      console.log("urls", urls);
      _.each(urls, this.getModel);
    },

    getMeasureModels: function() {
      this.each(function(data) {
        console.log("In collection, I have", data);
      });
    }

  });

  return AggreationCollection;
});
