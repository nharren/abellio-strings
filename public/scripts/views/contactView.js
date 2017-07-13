'use strict';

var app = app || {};

(function(module) {
  let contactView = {};

  contactView.initialize = function() {
    app.view.showSection('contact');
  }

  module.contactView = contactView;
})(app);