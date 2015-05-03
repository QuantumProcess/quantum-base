'use strict';
var app = angular.module('com.module.qgroups');

app.run(function($rootScope, Qgroup, gettextCatalog) {
  $rootScope.addMenu(gettextCatalog.getString('Groups'), 'app.qgroups.list',
    'fa-users');

  Qgroup.find(function(data) {
    $rootScope.addDashboardBox(gettextCatalog.getString('Groups'),
      'bg-yellow', 'ion-android-people', data.length, 'app.qgroups.list');
  });

});
