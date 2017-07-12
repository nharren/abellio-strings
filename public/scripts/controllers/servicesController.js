'use strict';

var app = app || {};

(function(module) {
  const servicesController = {};

  servicesController.index = () => {
    $('#menu-services').addClass('selected').siblings().removeClass('selected');
    $('#services').removeClass('hidden').siblings().addClass('hidden');
  };

  module.servicesController = servicesController;
})(app);
