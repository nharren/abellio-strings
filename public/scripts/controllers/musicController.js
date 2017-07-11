'use strict';

var app = app || {};

(function(module) {
  const musicController = {};

  musicController.index = () => {
    app.view.handleMenuItems();
    app.musicView.index();
  };

  module.musicController = musicController;
})(app);
