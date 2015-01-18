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

    onRender: function() {
      var graphEl = this.$el.find('.measure-graph').get(0);

      this.graph = new Chartist.Line(graphEl, {
        labels: this.model.get('labels'),
        series: [
          this.model.get('values')
        ]
      });
    }
  });

  return MeasureView;
});
