'use strict';

var app = app || {};

(function(module) {
  const homeController = {};

  homeController.index = () => {
    app.view.handleMenuItems();
    $('#home').removeClass('hidden').siblings().addClass('hidden');
  };

  module.homeController = homeController;
})(app);
