'use strict';
var app = angular.module('com.module.projects');

app.run(function($stateParams, $rootScope, Project, gettextCatalog) {

  $rootScope.addMenu(gettextCatalog.getString('Projects'), 'app.projects.list({project:undefined})',
    'fa-folder-o', ['user']);

  Project.find(function(data) {
    $rootScope.addDashboardBox(gettextCatalog.getString('Projects'),
      'bg-teal', 'ion-folder', data.length, 'app.projects.list', ['user']);
  });
});
