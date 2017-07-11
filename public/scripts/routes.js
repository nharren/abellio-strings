'use strict';

var app = app || {};

page('/', app.homeController.index);
page('/about', app.aboutController.index)
page('/services', app.servicesController.index)
page('/music', app.musicController.index)
page('/media', app.mediaController.index)
page('/contact', app.contactController.index)
page();