'use strict';

var app = app || {};

(function(module) {
  const aboutController = {};

  aboutController.index = () => {
    app.view.handleMenuItems();
    $('#about').removeClass('hidden').siblings().addClass('hidden');
  };

  module.aboutController = aboutController;
})(app);
