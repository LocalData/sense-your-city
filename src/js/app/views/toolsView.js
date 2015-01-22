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

    // TODO
    // For some reason, these UI hooks aren't working
    ui: {
      'displayTools': '.display-tools .button',
      'selectGraphs:': '.action-select-graphs',
      'selectTable:': '.action-select-table'
    },

    triggers: {
      'click .action-select-graphs': 'display:graphs',
      'click .action-select-table': 'display:table'
    },

    // TODO:
    // For some reason, events that duplicate triggers don't fire.
    events: {
      'click @ui.displayTools': 'show'
    },

    show: function(event) {
      this.ui.displayTools.removeClass('active');
      $(event.target).addClass('active');
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
