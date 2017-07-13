'use strict';

var app = app || {};

(function(module) {
  const samplesController = {};

  samplesController.index = function() {
    app.samplesView.initialize();
  };

  module.samplesController = samplesController;
})(app);
