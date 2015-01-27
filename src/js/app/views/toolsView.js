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
      // Display styles
      'displayTools': '.display-tools .button',
      'selectGraphs:': '.action-select-graphs',
      'selectTable:': '.action-select-table',

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
      'click @ui.selectWeekly': 'showTime'
    },

    showDisplay: function(event) {
      this.ui.displayTools.removeClass('active');
      $(event.target).addClass('active');
    },

    showTime: function(event) {
      this.ui.timeTools.removeClass('active');
      $(event.target).addClass('active');
      this.trigger('display:time', $(event.target).attr('data-action'));
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
