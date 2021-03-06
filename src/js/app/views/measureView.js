/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Chartist = require('chartist');
  var highcharts = require('highcharts');
  var L = require('leaflet');
  var Marionette = require('marionette');
  var moment = require('moment');

  // App
  var settings = require('app/settings');

  // Templates
  var template = require('text!templates/measure.html');

  var mapChannel = Backbone.Wreqr.radio.channel('map');

  var MeasureView = Marionette.ItemView.extend({
    template: _.template(template),

    className: 'measure',

    ui: {
      'graphs': '.measure-graph',
      'showInfo': '.action-show-info',
      'minimize': '.action-minimize',
      'maximize': '.action-maximize',
      'back': '.graph-back',
      'forward': '.graph-forward',
      'description': '.description',
      'loading': '.spinner'
    },

    events: {
      'click @ui.showInfo': 'showInfo',
      'click @ui.minimize': 'minimize',
      'click @ui.maximize': 'maximize'
    },

    triggers: {
      'click @ui.back': 'time:back',
      'click @ui.forward': 'time:forward'
    },

    loading: function() {
      console.log("Showing loading");
      this.ui.loading.toggleClass('start-hidden');
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

    onShow: function() {
      var $graphEl = this.$el.find('.measure-graph'); //.get(0);

      var options = {
        chart: {
          type: 'spline',
          style: {
              fontFamily: 'Source Sans Pro, Helvetica, sans-serif'
          }
        },
        title: {
          text: null
        },
        credits: {
          enabled: false
        },
        legend: {
          enabled: false
        },
        xAxis: {
          lineColor: '#e6e7e8',
          categories: this.model.get('labels'),
          labels: {
            align: 'left',
            x: 3,
            step: 2,
            formatter: function() {
              return moment(this.value).format("H:mm") + '<br />' + moment(this.value).format("D MMM");
            }
          },
          tickmarkPlacement: 'on'
        },
        yAxis: {
          lineColor: '#e6e7e8',
          gridLineColor: '#e6e7e8',
          startOnTick: false,
          endOnTick: false,
          labels: {
            title: {
              text: null
            }
          },
          title: {
            text: null
          }
        },
        plotOptions: {
          spline: {
            marker: {
              enabled: false
            }
          }
        },
        series: this.model.get('values')
      };

      if(_.has(this.model.get('meta'), 'min')) {
        options.yAxis.min = this.model.get('meta').min;
      }

      $graphEl.highcharts(options);
      var chart = $graphEl.highcharts();
      var lastIndex;
      var seriesIndex = {};
      _.each(this.model.get('values'), function(s, idx) {
        seriesIndex[s.name] = idx;
      });

      this.listenTo(mapChannel.vent, 'click:feature', function(feature) {
        // Set the last selected series back to the default
        if(lastIndex !== undefined) {
          chart.series[lastIndex].update({
            color: settings.seriesColor,
            lineWidth: 2
          });
        }

        // Highlight a series
        lastIndex = seriesIndex[feature.properties.name];
        if(lastIndex === undefined) {
          return; // no data to highlight
        }
        chart.series[lastIndex].update({
          color: settings.primaryColor,
          lineWidth: 4
        });
      });

      this.listenTo(mapChannel.vent, 'graphs:loading', this.loading);

      // TODO
      // Style line on hover / select
      // http://jsfiddle.net/gh/get/jquery/1.7.2/highslide-software/highcharts.com/tree/master/samples/highcharts/members/series-update/


      // Set up the chart options
      // var chartOptions = {
      //   // showPoint: false,
      //   axisY: {
      //     // Fixes problem with tiny value legends
      //     // (https://github.com/gionkunz/chartist-js/issues/110)
      //     labelInterpolationFnc: function(value) {
      //       return Math.round(value * 100) / 100;
      //     }
      //   },
//
      //   axisX: {
      //     labelInterpolationFnc: function(value) {
      //       return moment(value).format("hA") + '<br />' + moment(value).format("ddd");
      //     }
      //   }
      // };

      // var values = this.model.get('values');
      // this.graph = new Chartist.Line(graphEl, {
      //   labels: this.model.get('labels'),
      //   series: this.model.get('values')
      // }, chartOptions);
//
      // // Set up the tooltips
      // var easeOutQuad = function (x, t, b, c, d) {
      //   return -c * (t /= d) * (t - 2) + b;
      // };
//
      // // TODO: Improve tooltips?
      // // http://stackoverflow.com/questions/22633718/get-points-y-coordinate-on-svg-path
      // var $chart = this.$el.find('.ct-chart');
//
      // var $toolTip = $chart
      //   .append('<div class="tooltip"></div>')
      //   .find('.tooltip')
      //   .hide();
//
      // $chart.on('mouseenter', '.ct-point', function() {
      //   var $point = $(this),
      //     value = $point.attr('ct:value'),
      //     seriesName = $point.parent().attr('ct:series-name');
//
      //   $point.animate({'stroke-width': '10px'}, 300, easeOutQuad);
      //   $toolTip.html(seriesName + '<br>' + value).show();
      // });
//
      // $chart.on('mouseleave', '.ct-point', function() {
      //   var $point = $(this);
//
      //   $point.animate({'stroke-width': '4px'}, 300, easeOutQuad);
      //   $toolTip.hide();
      // });
//
      // $chart.on('mousemove', function(event) {
      //   $toolTip.css({
      //     left: (event.offsetX || event.originalEvent.layerX) - $toolTip.width() / 2 - 10,
      //     top: (event.offsetY || event.originalEvent.layerY) - $toolTip.height() - 40
      //   });
      // });
    }
  });

  return MeasureView;
});
