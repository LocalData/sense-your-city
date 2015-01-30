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
  var SourceDataView = require('app/views/sourceDataView');
  var template = require('text!templates/sourceData.html');

  var sourceDataView = Marionette.ItemView.extend({
    template: _.template(template),

    className: 'source'
  });

  return sourceDataView;
});
