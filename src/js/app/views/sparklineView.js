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
  var template = require('text!templates/sparkline.html');

  var SparklineView = Marionette.ItemView.extend({
    template: _.template(template),

    className: 'sparkline',

    onBeforeRender: function() {
      // console.log("Sparkline view", this);
    },

    onRender: function() {
      var graphEl = this.$el.find('.measure-graph').get(0);

      var chartOptions = {
        showPoint: false,
        fullWidth: true,
        chartPadding: 0,
        axisX: {
          offset: 5,
          showLabel: false,
          showGrid: false
        },
        axisY: {
          offset: 1,
          showLabel: false,
          showGrid: false
        }
      };

      this.graph = new Chartist.Line(graphEl, {
        labels: this.model.get('labels'),
        series: [
          this.model.get('values')
        ]}, chartOptions
      );
    }
  });

  return SparklineView;
});
