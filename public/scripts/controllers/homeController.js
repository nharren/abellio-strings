'use strict';

var app = app || {};

(function(module) {
  const homeController = {};

  homeController.index = function() {
    app.homeView.initialize();
  };

  module.homeController = homeController;
})(app);
