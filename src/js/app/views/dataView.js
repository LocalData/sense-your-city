/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  // Libs
  var $ = require('jquery');
  var _ = require('underscore');
  var Marionette = require('marionette');

  // App
  var settings = require('app/settings');
  var util = require('app/util');

  // Models
  var CityModel = require('app/models/city');
  var CityCollection = require('app/models/cityCollection');

  // Views
  var WorldDataCompositeView = require('app/views/worldDataCompositeView');

  // Templates
  var template = require('text!templates/data.html');

  function getOptions(span, resolution, options) {
    var params =  {
      op: 'mean',
      fields: settings.fieldsString,
      resolution: resolution
    };
    if (options.city) {
      params['over.city'] = options.city;
    }
    if (options.source) {
      params['each.sources'] = options.source;
    }
    params = _.defaults(params, util.getTimeRange(span));
    return params;
  }

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


      // Generate download links for each of the cities
      _.each(settings.cities, function(c) {
        c.properties.params = {};
        c.properties.base = settings.csvBaseUrl;

        var day5m = getOptions('day', '5m', { city: c.properties.name });
        var day1h = getOptions('day', '1h', { city: c.properties.name });
        var week1h = getOptions('week', '1h', { city: c.properties.name });
        var week6h = getOptions('week', '6h', { city: c.properties.name });

        c.properties.params.day5m = $.param(day5m);
        c.properties.params.day1h = $.param(day1h);
        c.properties.params.week1h = $.param(week1h);
        c.properties.params.week6h = $.param(week6h);

        // Now generate options for all of the sources in that city
        var sourceList = sources[c.properties.name];

        _.each(sourceList, function(s, i) {
          s.properties = {};
          s.properties.params = {};
          s.properties.base = settings.csvBaseUrl;

          var day5m = getOptions('day', '5m', { source:   s.id });
          var day1h = getOptions('day', '1h', { source:   s.id });
          var week1h = getOptions('week', '1h', { source: s.id });
          var week6h = getOptions('week', '6h', { source: s.id });

          s.properties.params.day5m = $.param(day5m);
          s.properties.params.day1h = $.param(day1h);
          s.properties.params.week1h = $.param(week1h);
          s.properties.params.week6h = $.param(week6h);
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
