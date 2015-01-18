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
    model: Entry,

    url: 'http://localdata-sensors.herokuapp.com/api/v1/sources/ci4lr75oi000202ypmtgrudhs/entries?startIndex=0&count=10&sort=desc',

    parse: function(data) {
      console.log("data", data);
      return data;
    }
  });

  return EntryCollection;
});
