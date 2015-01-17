/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');

  // App
  var Entry = require('app/models/entry');

  var EntryCollection = Backbone.Collection.extend({
    model: Entry
  });

  return EntryCollection;
});
