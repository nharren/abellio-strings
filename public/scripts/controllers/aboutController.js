'use strict';

var app = app || {};

(function(module) {
  const aboutController = {};

  aboutController.index = () => {
    $('#menu-about').addClass('selected').siblings().removeClass('selected');
    $('#about').removeClass('hidden').siblings().addClass('hidden');
  };

  module.aboutController = aboutController;
})(app);
