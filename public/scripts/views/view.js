'use strict';

var app = app || {};

(function(module) {

  var view = {};

  view.handleMenuItems = function() {
    let menuItems = $('nav a');
    menuItems.off('click');
    menuItems.on('click', function(event) {
      $(this).addClass('selected').siblings().removeClass('selected');
    })
  };

  module.view = view;
})(app);