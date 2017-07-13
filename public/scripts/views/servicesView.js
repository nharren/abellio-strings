'use strict';

var app = app || {};

(function(module) {
  let servicesView = {};

  servicesView.initialize = function() {
    app.view.showSection('services');
  }

  module.servicesView = servicesView;
})(app);