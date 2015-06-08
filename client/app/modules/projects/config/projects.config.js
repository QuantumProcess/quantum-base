'use strict';
var app = angular.module('com.module.projects');

app.run(function($rootScope, Project, gettextCatalog) {
  $rootScope.addMenu(gettextCatalog.getString('Projects'), 'app.projects.list',
    'fa-folder-o');

  Project.find(function(data) {
    $rootScope.addDashboardBox(gettextCatalog.getString('Projects'),
      'bg-teal', 'ion-folder', data.length, 'app.projects.list');
  });

});
