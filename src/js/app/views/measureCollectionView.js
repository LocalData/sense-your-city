/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var L = require('leaflet');
  var Marionette = require('marionette');

  // App
  var settings = require('app/settings');
  var MeasureView = require('app/views/measureView');
  var SparklineView = require('app/views/sparklineView');

  var MeasureCollectionView = Backbone.Marionette.CollectionView.extend({
    className: 'measures',
    getChildView: function(item) {
      console.log("Creating measure item view", this);
      if (this.options.sparklines === true) {
              console.log("Creating SPARKLINE view", this);

        return SparklineView;
      }
      return MeasureView;
    }
  });

  return MeasureCollectionView;
});
