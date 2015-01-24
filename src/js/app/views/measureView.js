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
  var moment = require('moment');

  // App
  var settings = require('app/settings');

  // Templates
  var template = require('text!templates/measure.html');

  var MeasureView = Marionette.ItemView.extend({
    template: _.template(template),

    className: 'measure',

    ui: {
      'graphs': '.measure-graph',
      'showInfo': '.action-show-info',
      'minimize': '.action-minimize',
      'maximize': '.action-maximize',
      'description': '.description'
    },

    events: {
      'click @ui.showInfo': 'showInfo',
      'click @ui.minimize': 'minimize',
      'click @ui.maximize': 'maximize'
    },

    showInfo: function(event) {
      this.ui.showInfo.toggleClass('active');
      this.ui.description.toggleClass('active');
    },

    minimize: function() {
      this.ui.minimize.hide();
      this.ui.maximize.show();
      this.ui.graphs.hide();
    },

    maximize: function() {
      this.ui.minimize.show();
      this.ui.maximize.hide();
      this.ui.graphs.show();
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
        },

        axisX: {
          labelInterpolationFnc: function(value) {
            return moment(value).format("ddd hA");
          }
        }
      };

      this.graph = new Chartist.Line(graphEl, {
        labels: this.model.get('labels'),
        series: [
          this.model.get('values')
        ]
      }, chartOptions);
    }
  });

  return MeasureView;
});
