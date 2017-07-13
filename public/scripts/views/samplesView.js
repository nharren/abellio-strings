'use strict';

var app = app || {};

(function(module) {
  let samplesView = {};

  samplesView.initialize = function() {
    app.view.showSection('samples');
  }

  module.samplesView = samplesView;
})(app);