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

  var MeasureCollectionView = Marionette.CollectionView.extend({
    className: 'measures',
    childView: MeasureView
  });

  return MeasureCollectionView;
});
