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
  var EntryTableView = require('app/views/entryTableView');
  var template = require('text!templates/entryTable.html');

  var EntriesTableView = Marionette.CompositeView.extend({
    template: _.template(template),
    className: 'entry-table',
    childViewContainer: 'tbody',
    childView: EntryTableView
  });

  return EntriesTableView;
});
