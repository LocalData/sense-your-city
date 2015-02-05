/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Marionette = require('marionette');

  // App
  var settings = require('app/settings');

  // Modules & Views
  var CityModule = require('app/modules/cityModule');
  var DataModule = require('app/modules/dataModule');
  var HomeModule = require('app/modules/homeModule');
  var SourceModule = require('app/modules/sourceModule');
  var SparklineModule = require('app/modules/sparklineModule');

  var MapView = require('app/views/map');

  // Tweets
  var TweetView = require('app/views/tweetView');
  var TweetModel = require('app/models/tweet');

  // Templates
  var template = require('text!templates/home.html');

  // Channels
  // exportChannel.vent
  // mapChannel.vent

  var App = new Marionette.Application();

  App.addRegions({
    headerRegion: 'header',
    sparklineRegion: '#sparkline-region',
    mainRegion: '#main-region',
    toolsRegion: '#tools-region',
    twitterRegion: '#twitter-region'
  });

  App.module('SparklineModule', SparklineModule);
  App.module('HomeModule', HomeModule);
  App.module('CityModule', CityModule);
  App.module('SourceModule', SourceModule);
  App.module('DataModule', DataModule);

  // Wait for the app to start
  function start(options) {
    if(Backbone.history){
      Backbone.history.start();
    }

    // Hamburger menu toggle for mobile / responsive
    $('.hamburger').click(function(event) {
      event.preventDefault();
      $('.pure-menu ul').toggleClass('show');
    });
  }

  // Start the map region before anything else
  App.on('before:start', function() {
    App.mapView = new MapView({ id: 'map' });

    var tweet = new TweetModel();
    tweet.autoUpdate();
    var tweetView = new TweetView({
      model: tweet
    });
    App.twitterRegion.show(tweetView);

    var mapChannel = Backbone.Wreqr.radio.channel('map');
    this.listenTo(mapChannel.vent, 'hide:header', function() {
      $('header').hide();
    });
    this.listenTo(mapChannel.vent, 'show:header', function() {
      $('header').show();
    });
  });

  App.on('start', start);
  return App;
});
