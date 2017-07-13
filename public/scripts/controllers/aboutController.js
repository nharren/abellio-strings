'use strict';

var app = app || {};

(function(module) {
  const aboutController = {};

  aboutController.index = function() {
    app.aboutView.initialize();
  };

  module.aboutController = aboutController;
})(app);
