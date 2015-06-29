'use strict';
var app = angular.module('com.module.tasks');

app.run(function($stateParams, $rootScope, Task, gettextCatalog) {

  $rootScope.addMenu(gettextCatalog.getString('Tasks'), 'app.tasks.list',
    'fa-tasks', ['user']);

  Task.find(function(data) {
    $rootScope.addDashboardBox(gettextCatalog.getString('Tasks'),
      'bg-purple', 'ion-wrench', data.length, 'app.tasks.list', ['user']);
  });
});
