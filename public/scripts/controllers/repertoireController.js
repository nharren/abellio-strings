'use strict';

var app = app || {};

(function(module) {
  const repertoireController = {};

  repertoireController.index = function() {
    app.repertoireView.initialize();
  };

  module.repertoireController = repertoireController;
})(app);
