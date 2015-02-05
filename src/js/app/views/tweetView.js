/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Chartist = require('chartist');
  var L = require('leaflet');
  var Marionette = require('marionette');

  // App
  var settings = require('app/settings');

  // Templates
  var template = require('text!templates/tweet.html');

  var TweetView = Marionette.ItemView.extend({
    template: _.template(template),

    initialize: function() {
      this.model.on('change', this.render);
    },

    className: 'tweet'
  });

  return TweetView;
});
