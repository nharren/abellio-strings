'use strict';

var app = app || {};

(function(module) {
  const contactController = {};

  contactController.index = () => {
    $('#menu-contact').addClass('selected').siblings().removeClass('selected');
    $('#contact').removeClass('hidden').siblings().addClass('hidden');
  };

  module.contactController = contactController;
})(app);
