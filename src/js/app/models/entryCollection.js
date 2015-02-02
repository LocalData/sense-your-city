/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');

  // App
  var settings = require('app/settings');
  var Entry = require('app/models/entry');

  var EntryCollection = Backbone.Collection.extend({
    model: Entry,

    initialize: function(options) {
      this.id = options.id;
    },

    url: function() {
      return settings.baseUrl + 'sources/' + this.id + '/entries?startIndex=0&count=30&sort=desc';
    },

    parse: function(data) {
      return data;
    }
  });

  return EntryCollection;
});
