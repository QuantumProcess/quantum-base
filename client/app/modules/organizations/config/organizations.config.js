'use strict';
var app = angular.module('com.module.organizations');

app.run(function($rootScope, Organization, gettextCatalog) {
  $rootScope.addMenu(gettextCatalog.getString('Organizations'), 'app.organizations.list',
    'fa-building-o');

  Organization.find(function(data) {
    $rootScope.addDashboardBox(gettextCatalog.getString('Organizations'),
      'bg-blue', 'ion-cube', data.length, 'app.organizations.list');
  });

});
