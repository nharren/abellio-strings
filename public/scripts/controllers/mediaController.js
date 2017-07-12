'use strict';

var app = app || {};

(function(module) {
  const mediaController = {};

  mediaController.index = () => {
    $('#menu-media').addClass('selected').siblings().removeClass('selected');
    $('#media').removeClass('hidden').siblings().addClass('hidden');
  };

  module.mediaController = mediaController;
})(app);
