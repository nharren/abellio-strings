'use strict';

var app = app || {};

(function(module) {
  const mediaController = {};

  mediaController.index = () => {
    app.view.handleMenuItems();
    $('#media').removeClass('hidden').siblings().addClass('hidden');
  };

  module.mediaController = mediaController;
})(app);
