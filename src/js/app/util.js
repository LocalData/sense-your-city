/*jslint nomen: true */
/*globals define: true */

define(function(require, exports, module) {
  'use strict';

  var _ = require('underscore');
  var moment = require('moment');

  var FORMAT = 'MM-DD-YYYY HH:mm:ss';

  var util = {};

  /*
    Calculate a certain range back in time
    Spans can be:
    hour -- 5 minute resolution (12 points)
    day --  1 hour resolution (12 points)
    week -- 6 hour resolution (14 points)
   */
  util.getTimeRange = function(span) {
    var remainder, before, from, resolution;

    before = moment();

    if(span === 'hour') {
      // Go 60 minutes back
      // Round to the nearest minute
      before.add(60, 'seconds');
      before = moment(before.format('MM-DD-YYYY HH:mm:00'), FORMAT); //reduce precision
      from = moment(before).subtract(60, 'minutes');
      resolution = '5m';
    } else if (span === 'day') {
      // 24 hours back
      // Round to the nearest hour
      before.add(60, 'minutes');
      before = moment(before.format('MM-DD-YYYY HH:00:00'), FORMAT); //reduce precision
      from = moment(before).subtract(24, 'hours');
      resolution = '1h';
    } else if (span === 'week') {
      // 7 days back
      // Round to the nearest day
      before.add(1, 'day');
      before = moment(before.format('MM-DD-YYYY 00:00:00'), FORMAT); //reduce precision
      from = moment(before).subtract(7, 'days');
      resolution = '6h';
    }

    return {
      resolution: resolution,
      from: from.format(),
      before: before.format()
    };
  };


  util.stepBack = function(options) {
    var from = moment(options.from);
    var before = moment(options.before);

    if (options.span === 'hour') {
      // Go back half an hour
      from = from.subtract(30, 'minutes');
      before = before.subtract(30, 'minutes');
    }
    if (options.span === 'day' ) {
      // Go back 18 hours
      from = from.subtract(18, 'hours');
      before = before.subtract(18, 'hours');

    }
    if (options.span === 'week') {
      // Go back 6 days
      from = from.subtract(6, 'days');
      before = before.subtract(6, 'days');
    }

    return {
      resolution: options.resolution,
      from: from.format(),
      before: before.format()
    };
  };


  util.stepForward = function(options) {
    var from = moment(options.from);
    var before = moment(options.before);

    if (options.span === 'hour') {
      // Go forward half an hour
      from = from.add(30, 'minutes');
      before = before.add(30, 'minutes');
    }
    if (options.span === 'day' ) {
      // Go forward 18 hours
      from = from.add(18, 'hours');
      before = before.add(18, 'hours');

    }
    if (options.span === 'week') {
      // Go back 6 days
      from = from.add(6, 'days');
      before = before.add(6, 'days');
    }

    // If we're trying to go into the future, reset the timespan.
    if(before > moment()) {
      return util.getTimeRange(options.span);
    }

    return {
      resolution: options.resolution,
      from: from.format(),
      before: before.format()
    };
  };

  return util;
});
