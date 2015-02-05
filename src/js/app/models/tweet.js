/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');

  var settings = require('app/settings');
  var FORMAT = 'XXX'; // "Thu Feb 05 21:04:09 +0000 2015"

  var Tweet = Backbone.Model.extend({
    url: function() {
      return settings.twitterProxyURL + 'search?term=datacanvas';
    },

    defaults: {
      id: '',
      ago: '',
      username: '',
      location: '',
      date: '',
      text: ''
    },

    parse: function(tweet) {
      // if (tweet.date) {
      //   tweet.ago = moment(tweet.date).fromNow()
      // }
      console.log("Parsing tweet", tweet);
      return tweet.data;
    },

    autoUpdate: function() {
      this.fetch();
      var autoUpdate = _.bind(this.autoUpdate, this);
      _.delay(autoUpdate, settings.twitterDelay);
    }
  });

  return Tweet;
});
