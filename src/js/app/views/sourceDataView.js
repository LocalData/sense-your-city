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

  var exportChannel = Backbone.Wreqr.radio.channel('export');

  var sourceDataView = Marionette.ItemView.extend({
    template: _.template(template),

    ui: {
      'toggle': '.action-source-toggle',
      'minimize': '.action-minimize',
      'maximize': '.action-maximize',
      'data': '.source-data'
    },

    events: {
      'click @ui.toggle': 'toggle'
    },

    initialize: function() {
      this.listenTo(exportChannel.vent, 'show:source', this.showSource);
    },

    showSource: function(source) {
      if (source === this.model.get('name')) {
        this.toggle();
      }
    },

    toggle: function() {
      this.ui.minimize.toggle();
      this.ui.maximize.toggle();
      this.ui.data.toggle();
    },

    className: 'source'
  });

  return sourceDataView;
});
