'use strict';

var app = app || {};

(function(module) {
  const musicController = {};

  musicController.index = () => {
    $('#menu-music').addClass('selected').siblings().removeClass('selected');
    app.musicView.index();
  };

  module.musicController = musicController;
})(app);
