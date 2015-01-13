/*jslint nomen: true */
/*globals define: true */

define(function (require) {
  'use strict';

  var settings = require('app/settings');
  var $ = require('jquery');

  var api = {};

  // Return the current hostname.
  api.getBaseURL = function() {
    if (window.location.protocol !== "https:") {
      return "https://" + window.location.host;
    }

    return "http://" + window.location.host;
  };

  // Find a survey by slug
  // Given a slug (eg 'just-a-surey') Sets settings.surveyId
  api.setSurveyIdFromSlug = function(callback) {
    var slug = window.location.hash.slice(1);
    var url = settings.api.baseurl +  "/slugs/" + slug;
    console.log("Survey slug: " + url);

    // Save ourselves an ajax request
    if (settings.slug === slug && settings.surveyId !== null) {
      return callback();
    }

    // TODO: Display a nice error if the survey wans't found.
    $.getJSON(url, function(data) {
      console.log("Survey Id: " + data.survey);
      settings.slug = slug;
      settings.surveyId = data.survey;
      callback(data.survey);
    });
  };

  // Get a survey by ID
  api.getSurvey = function(id, callback) {
    var url = settings.api.baseurl +  "/surveys/" + id;

    var jqxhr = $.getJSON(url)
    .done(function(data) {
      callback(data.survey);
    })
    .fail(function(error){
      callback(null, error);
    });
  };

  api.getSurveyFromSlug = function(callback) {
    api.setSurveyIdFromSlug(function(id) {
      api.getSurvey(id, callback);
    }.bind(this));
  };

  // Get the form
  api.getForm = function(callback) {
    console.log('Getting form data');
    var url = api.getSurveyURL() + '/forms';

    var jqxhr = $.getJSON(url)
    .done(function(data) {
      settings.formData = data.forms[0];
      callback(settings.formData);
    })
    .fail(function(error){
      callback(null, error);
    });
  };

  // Generates the URL for the current survey
  // (Current survey is set by setSurveyIdFromSlug, above)
  api.getSurveyURL = function() {
    return settings.api.baseurl + "/surveys/" + settings.surveyId;
  };

  return api;
});
