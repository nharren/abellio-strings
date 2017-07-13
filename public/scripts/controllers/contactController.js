'use strict';

var app = app || {};

(function(module) {
  const contactController = {};

  contactController.index = function() {
    app.contactView.initialize();
  };

  module.contactController = contactController;
})(app);
