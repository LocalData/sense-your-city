/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');

  // App
  var Source = require('app/models/source');

  var SourceCollection = Backbone.Collection.extend({
    model: Source
  });

  return SourceCollection;
});
