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
  var TreeView = require('app/views/cityDataCompositeView');
  var template = require('text!templates/entryTable.html');

  var WorldDataCompositeView = Backbone.Marionette.CollectionView.extend({
    template: _.template(template),
    // childViewContainer: 'tbody',
    childView: TreeView
  });

  return WorldDataCompositeView;
});
