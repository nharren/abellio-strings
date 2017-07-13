'use strict';

var app = app || {};

(function(module) {
  let aboutView = {};

  aboutView.initialize = function() {
    app.view.showSection('about');
  }

  module.aboutView = aboutView;
})(app);