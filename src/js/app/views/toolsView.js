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

  var OverviewView = Marionette.CompositeView.extend({
    template: _.template(template),
    childView: ToolView,
    childViewContainer: '.city-list',
    className: 'tools',

    childEvents: {
      'select:city': function(view) {
        this.children.apply('deselect');
        view.select();
      }
    }
  });

  return OverviewView;
});
