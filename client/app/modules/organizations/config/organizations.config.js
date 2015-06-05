'use strict';
var app = angular.module('com.module.organizations');

app.run(function($rootScope, Organization, gettextCatalog, User) {

  User.getCurrent().$promise.then(function(user){
    User.findById({
      id:user.id,
      filter:{ include:'roles' }
    },function(user) {
        user.roles.forEach(function(role) {
          if(role.name==="admin") {

            $rootScope.addMenu(gettextCatalog.getString('Organizations'), 'app.organizations.list',
              'fa-building-o');

            Organization.find(function(data) {
              $rootScope.addDashboardBox(gettextCatalog.getString('Organizations'),
                'bg-blue', 'ion-cube', data.length, 'app.organizations.list');
            });
          }
        });
      },
      function(errorResponse) {
        console.error('Error',errorResponse);
      }
    );
  });
});
