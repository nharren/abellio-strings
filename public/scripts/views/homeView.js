'use strict';

var app = app || {};

(function(module) {
  let homeView = {};

  homeView.initialize = function() {
    app.view.showSection('home');
  }

  module.homeView = homeView;
})(app);