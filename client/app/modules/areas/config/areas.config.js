'use strict';
var app = angular.module('com.module.areas');

app.run(function($stateParams, $rootScope, Area, gettextCatalog) {

  $rootScope.addMenu(gettextCatalog.getString('Areas'), 'app.areas.list',
    'fa-cubes', ['user'] );

  Area.find(function(data) {
    $rootScope.addDashboardBox(gettextCatalog.getString('Areas'),
      'bg-aqua', 'ion-asterisk', data.length, 'app.areas.list', ['user']);
  });
});
