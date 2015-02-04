/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var L = require('leaflet');
  var Marionette = require('marionette');

  // App
  var settings = require('app/settings');
  var SourceCollection = require('app/models/sourceCollection');
  var SourceDataView = require('app/views/sourceDataView');
  var template = require('text!templates/cityData.html');

  var exportChannel = Backbone.Wreqr.radio.channel('export');

  var cityDataCompositeView = Marionette.CompositeView.extend({
    template: _.template(template),
    // childViewContainer: '.source-list',
    tagName: 'tbody',
    className: 'city',
    childView: SourceDataView,

    ui: {
      'toggle': '.action-toggle',
      'minimize': '.action-minimize',
      'maximize': '.action-maximize',
      'data': '.source'
    },

    events: {
      'click @ui.toggle': 'toggle'
    },

    toggle: function() {
      this.ui.minimize.toggle();
      this.ui.maximize.toggle();
      // Todo -- restructure to be more backbone-ish
      $('.source.' + _.camelCase(this.model.get('properties').name)).toggle();
    },

    initialize: function() {
      this.collection = new SourceCollection(this.model.get('properties').sources);
      this.listenTo(exportChannel.vent, 'show:city', this.showCity);
    },

    showCity: function(city) {
      if (city === this.model.get('properties').name) {
        this.ui.minimize.toggle();
        this.ui.maximize.toggle();
      }
    }
  });

  return cityDataCompositeView;
});
