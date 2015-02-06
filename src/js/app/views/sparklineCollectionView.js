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
  var SparklineView = require('app/views/sparklineView');
  var template = require('text!templates/sparklineContainer.html');

  var SparklineCollectionView = Backbone.Marionette.CompositeView.extend({
    template: _.template(template),
    className: 'sparkline-container',
    childViewContainer: '.sparklines',
    childView: SparklineView,

    initialize: function() {
      _.bindAll(this, 'checkInactive');
      this.collection.on('reset', this.checkInactive);
    },

    checkInactive: function() {
      if (this.collection.isEmpty()) {
        this.model.attributes.properties.inactive = true;
        try {
          this.render();
        } catch(e) {

        }
      }
    }
  });

  return SparklineCollectionView;
});
