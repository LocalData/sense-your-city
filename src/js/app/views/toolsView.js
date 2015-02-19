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
  var mapChannel = Backbone.Wreqr.radio.channel('map');

  var ToolView = require('app/views/toolView');

  // Templates
  var template = require('text!templates/tools.html');

  var ToolsView = Marionette.CompositeView.extend({
    template: _.template(template),
    childView: ToolView,
    className: 'tools',

    templateHelpers: {
      showCityList: function() {
        return this.showCities;
      }
    },

    ui: {
      // Display styles
      'displayTools': '.display-tools .button',
      'selectGraphs:': '.action-select-graphs',
      'selectTable:': '.action-select-table',

      'city': '.city',

      // Time ranges
      'timeTools': '.time-tools .button',
      'selectHourly': '.time-tools .select-hourly',
      'selectDaily': '.time-tools .select-daily',
      'selectWeekly': '.time-tools .select-weekly'
    },

    triggers: {
      'click .action-select-graphs': 'display:graphs',
      'click .action-select-table': 'display:table'
    },

    events: {
      'click @ui.displayTools': 'showDisplay',

      // Time ranges
      'click @ui.selectHourly': 'showTime',
      'click @ui.selectDaily': 'showTime',
      'click @ui.selectWeekly': 'showTime',

      'click @ui.city': 'showCity'
    },

    onBeforeRender: function() {
      this.listenTo(mapChannel.vent, 'click:feature', function(feature) {
        this.ui.city.removeClass('active');
        // Slugify (more or less) the name, since it can contain anything.
        // It's probably enough to just escape the name, but now we have
        // something that could even be an ID.
        var name = _.kebabCase(feature.properties.name);
        // WTF
        $($.find("[data-city='" + name + "']")).addClass('active');
      });
    },

    showCity: function(event) {
      this.ui.city.removeClass('active');
      $(event.target).addClass('active');

      // Find the city
      var name = $(event.target).attr('data-city');
      var feature = _.find(settings.cities, function(c) {
        return _.kebabCase(c.properties.name) === name;
      });

      // And event it.
      mapChannel.vent.trigger('click:feature', feature);
      mapChannel.vent.trigger('open:popup:feature', feature);
    },

    showDisplay: function(event) {
      this.ui.displayTools.removeClass('active');
      $(event.target).addClass('active');
    },

    showTime: function(event) {
      this.ui.timeTools.removeClass('active');
      $(event.target).addClass('active');
      this.trigger('time:setRange', $(event.target).attr('data-action'));
    },

    childEvents: {
      'select:city': function(view) {
        this.children.apply('deselect');
        view.select();
      }
    }
  });

  return ToolsView;
});
