'use strict';

var app = app || {};

(function(module) {
  const servicesController = {};

  servicesController.index = function() {
    app.servicesView.initialize();
  };

  module.servicesController = servicesController;
})(app);
