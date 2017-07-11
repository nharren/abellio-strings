'use strict';

var app = app || {};

(function(module) {
  const contactController = {};

  contactController.index = () => {
    app.view.handleMenuItems();
    $('#contact').removeClass('hidden').siblings().addClass('hidden');
  };

  module.contactController = contactController;
})(app);
