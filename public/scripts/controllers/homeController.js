'use strict';

var app = app || {};

(function(module) {
  const homeController = {};

  homeController.index = () => {
    $('#menu-home').addClass('selected').siblings().removeClass('selected');
    $('#home').removeClass('hidden').siblings().addClass('hidden');
  };

  module.homeController = homeController;
})(app);
