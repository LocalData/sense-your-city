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
  var template = require('text!templates/toolCity.html');

  var ToolView = Marionette.ItemView.extend({
    template: _.template(template),

    className: 'city',

    ui: {
      'button': '.button'
    },

    triggers: {
      "click @ui.button": "select:city"
    },

    select: function() {
      this.ui.button.addClass('selected');
    },

    deselect: function() {
      this.ui.button.removeClass('selected');
    }
  });

  return ToolView;
});
