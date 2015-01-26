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

  var ToolView = require('app/views/toolView');

  // Templates
  var template = require('text!templates/tools.html');

  var ToolsView = Marionette.CompositeView.extend({
    template: _.template(template),
    childView: ToolView,
    childViewContainer: '.city-list',
    className: 'tools',

    ui: {
      'timeTools': '.time-tools .button',
      'selectHourly': '.time-tools .select-hourly',
      'selectDaily': '.time-tools .select-daily',
      'selectWeekly': '.time-tools .select-weekly',

      'displayTools': '.display-tools .button',
      'selectGraphs:': '.action-select-graphs',
      'selectTable:': '.action-select-table'
    },

    triggers: {
      'click .action-select-graphs': 'display:graphs',
      'click .action-select-table': 'display:table',
      'click .time-tools .button': 'display:time'
    },

    // TODO:
    // For some reason, events that duplicate triggers don't fire.
    events: {
      'click @ui.displayTools': 'showDisplay',
      'click @ui.selectHourly': 'showTime',
      'click @ui.selectDaily': 'showTime',
      'click @ui.selectWeekly': 'showTime'
    },

    showDisplay: function(event) {
      this.ui.displayTools.removeClass('active');
      $(event.target).addClass('active');
    },

    showTime: function(event) {
      this.ui.timeTools.removeClass('active');
      $(event.target).addClass('active');
      this.trigger('display:time');
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
