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
  var template = require('text!templates/entryRow.html');

  var EntryTableView = Marionette.ItemView.extend({
    template: _.template(template),
    tagName: 'tr'
  });

  return EntryTableView;
});
