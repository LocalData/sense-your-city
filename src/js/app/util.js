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
    var remainder, from, resolution;
    var before = moment();
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

    // console.log("Set time", span, from.format(FORMAT), before.format(FORMAT), resolution);

    return {
      resolution: resolution,
      from: from.format(),
      before: before.format()
    };
  };


  return util;
});
