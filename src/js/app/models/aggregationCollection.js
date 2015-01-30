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

    getModel: function(url, callback) {
      var req = $.get(url).done(function(data){
        console.log("Got aggregation", data);
        this.add({ data: data }, { parse: true});
        callback();
      }.bind(this)).fail(function(error){
        callback(error);
      });
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
      async.each(urls, this.getModel, function() {
        console.log("DONE");
        this.trigger('loaded');
      });
    },

    getMeasureModels: function() {
      var datas = { }
      this.each(function(data) {
        console.log("In collection, I have", data);

      });
    }

  });

  return AggreationCollection;
});
