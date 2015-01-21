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
  var template = require('text!templates/measure.html');

  var MeasureView = Marionette.ItemView.extend({
    template: _.template(template),

    className: 'measure',

    ui: {
      'showInfo': '.action-show-info',
      'description': '.description'
    },

    events: {
      'click @ui.showInfo': 'showInfo'
    },

    onRender: function() {
      var graphEl = this.$el.find('.measure-graph').get(0);

      var chartOptions = {
        showPoint: false,
        axisY: {
          // Fixes problem with tiny value legends
          // (https://github.com/gionkunz/chartist-js/issues/110)
          labelInterpolationFnc: function(value) {
            return Math.round(value * 100) / 100;
          }
        }
      };

      this.graph = new Chartist.Line(graphEl, {
        labels: this.model.get('labels'),
        series: [
          this.model.get('values')
        ]
      }, chartOptions);
    },

    showInfo: function(event) {
      this.ui.showInfo.toggleClass('active');
      this.ui.description.toggleClass('active');
    }
  });

  return MeasureView;
});
