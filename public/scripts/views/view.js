'use strict';

var app = app || {};

(function(module) {

  var view = {};

  view.showSection = function(sectionName) {
    let section = document.getElementById(sectionName);

    if (!app.view.currentSection) {
      hideSectionsExcept(section);   
    } else if (app.view.currentSection.id !== section.id) {
      section.classList.remove('hidden');
      app.view.currentSection.classList.add('hidden');
    }

    let menuItemName = `menu-${sectionName}`;
    selectMenuItem(menuItemName);

    app.view.currentSection = section;
  }

  function hideSectionsExcept(section) {
    let sections = document.getElementsByTagName('section');

    for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
      let currentSection = sections[sectionIndex];

      if (currentSection.id !== section.id) {
        currentSection.classList.add('hidden');
      }     
    }
  }

  function selectMenuItem(menuItemName) {
    let menuItem = document.getElementById(menuItemName);
    menuItem.classList.add('selected');

    if (app.view.currentMenuItem && app.view.currentMenuItem.id !== menuItem.id) {
      app.view.currentMenuItem.classList.remove('selected');
    }

    app.view.currentMenuItem = menuItem;
  };

  module.view = view;
})(app);