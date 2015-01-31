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

      // Set up the chart options
      var chartOptions = {
        // showPoint: false,
        axisY: {
          // Fixes problem with tiny value legends
          // (https://github.com/gionkunz/chartist-js/issues/110)
          labelInterpolationFnc: function(value) {
            return Math.round(value * 100) / 100;
          }
        },

        axisX: {
          labelInterpolationFnc: function(value) {
            return moment(value).format("hA") + '<br />' + moment(value).format("ddd");
          }
        }
      };

      // var values = this.model.get('values');
      this.graph = new Chartist.Line(graphEl, {
        labels: this.model.get('labels'),
        series: this.model.get('values')
      }, chartOptions);

      // Set up the tooltips
      var easeOutQuad = function (x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
      };

      // TODO: Improve tooltips?
      // http://stackoverflow.com/questions/22633718/get-points-y-coordinate-on-svg-path
      var $chart = this.$el.find('.ct-chart');

      var $toolTip = $chart
        .append('<div class="tooltip"></div>')
        .find('.tooltip')
        .hide();

      $chart.on('mouseenter', '.ct-point', function() {
        var $point = $(this),
          value = $point.attr('ct:value'),
          seriesName = $point.parent().attr('ct:series-name');

        $point.animate({'stroke-width': '10px'}, 300, easeOutQuad);
        $toolTip.html(seriesName + '<br>' + value).show();
      });

      $chart.on('mouseleave', '.ct-point', function() {
        var $point = $(this);

        $point.animate({'stroke-width': '4px'}, 300, easeOutQuad);
        $toolTip.hide();
      });

      $chart.on('mousemove', function(event) {
        $toolTip.css({
          left: (event.offsetX || event.originalEvent.layerX) - $toolTip.width() / 2 - 10,
          top: (event.offsetY || event.originalEvent.layerY) - $toolTip.height() - 40
        });
      });
    }
  });

  return MeasureView;
});
