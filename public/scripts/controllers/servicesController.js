'use strict';

var app = app || {};

(function(module) {
  const servicesController = {};

  servicesController.index = () => {
    app.view.handleMenuItems();
    $('#services').removeClass('hidden').siblings().addClass('hidden');
  };

  module.servicesController = servicesController;
})(app);
