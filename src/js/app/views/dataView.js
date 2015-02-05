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

  // App
  var settings = require('app/settings');
  var util = require('app/util');

  // Models
  var CityModel = require('app/models/city');
  var CityCollection = require('app/models/cityCollection');

  // Views
  var CityDataCompositeView = require('app/views/cityDataCompositeView');
  var WorldDataCompositeView = require('app/views/worldDataCompositeView');

  // Templates
  var template = require('text!templates/data.html');

  var DataView = Marionette.LayoutView.extend({
    className: 'data-downloads',
    template: _.template(template),

    regions: {
      dataRegion: '#data-region'
    },

    ui: {
      // Display styles
      'showMore': '.action-show-more'
    },

    events: {
      'click @ui.showMore': 'showMore'
    },

    showMore: function(event) {
      $(event.target).hide();
      $(event.target).parent().find('.more').slideToggle();
    },

    // Attach sources to cities
    // TODO -- abstract this into the City model?
    prepCities: function() {
      var sources = _.groupBy(settings.sources, function(s) {
        return s.city;
      });

      _.each(settings.cities, function(c) {
        c.properties.base = settings.baseUrl;
        c.properties.ranges = {
          day: util.getTimeRange('day'),
          week: util.getTimeRange('week')
        };

        var sourceList = sources[c.properties.name];
        _.each(sourceList, function(source, i) {
          sourceList[i].properties = {
            base: settings.baseUrl,
            ranges: {
              day: util.getTimeRange('day'),
              week: util.getTimeRange('week')
            }
          };
        });

        c.properties.sources = sourceList;
      });

      return settings.cities;
    },

    onBeforeShow: function() {
      // Show the tools view
      var cities = this.prepCities();
      var cityCollection = new CityCollection(cities);
      var worldDataCompositeView = new WorldDataCompositeView({
        model: new CityModel({ name: 'placeholder' }),
        collection: cityCollection
      });
      this.getRegion('dataRegion').show(worldDataCompositeView);
    }
  });

  return DataView;
});
