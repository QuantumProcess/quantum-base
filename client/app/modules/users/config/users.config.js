'use strict';
angular.module('com.module.users')
  .run(function($rootScope, User, gettextCatalog) {
    $rootScope.addMenu(gettextCatalog.getString('Users'), 'app.users.list',
      'fa-user');

    User.find(function(data) {
      $rootScope.addDashboardBox(gettextCatalog.getString('Users'),
        'bg-green', 'ion-person', data.length, 'app.users.list');
    });
  });
