'use strict';

var app = app || {};

page('/', app.homeController.index);
page('/about', app.aboutController.index)
page('/services', app.servicesController.index)
page('/repertoire', app.repertoireController.index)
page('/samples', app.samplesController.index)
page('/contact', app.contactController.index)
page();