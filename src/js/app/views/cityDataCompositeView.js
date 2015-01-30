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
  var SourceCollection = require('app/models/sourceCollection');
  var SourceDataView = require('app/views/sourceDataView');
  var template = require('text!templates/cityData.html');

  var cityDataCompositeView = Marionette.CompositeView.extend({
    template: _.template(template),

    initialize: function() {
      this.collection = new SourceCollection(this.model.get('properties').sources);
    },

    className: 'city',
    childView: SourceDataView
  });

  return cityDataCompositeView;
});
