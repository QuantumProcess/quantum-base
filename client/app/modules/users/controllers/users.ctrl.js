'use strict';
var app = angular.module('com.module.users');

app.controller('UsersCtrl', function($scope, $rootScope, $stateParams, $state, CoreService,
  User, gettextCatalog, Organization, UsersService) {

  if ($stateParams.id) {
    User.findOne({
      filter: {
        where: {
          id: $stateParams.id
        },
        include: ['roles', 'identities', 'credentials', 'accessTokens']
      }
    }, function(result) {
      $scope.user = result;
    }, function(err) {
      console.log(err);
    });
  } else {
    $scope.user = {};
  }

  function loadItems() {
    $scope.currentOrganizationUsers = [];
    $scope.systemUsers = [];

    // UsersService.getOrganizationUsers( $stateParams.organization, function(users) {
    //   $scope.currentOrganizationUsers = users;
    // });

    UsersService.getSystemUsers( function(users) {
      if($stateParams.organization) {
        for(var i=0; i<users.length; i++) {
          var inOrg = false;
          for(var j=0; j<users[i].organizations.length; j++) {
            if(users[i].organizations[j].id==$stateParams.organization) {
              inOrg = true;
              continue;
            }
          }
          if(inOrg) {
            $scope.currentOrganizationUsers.push(users[i]);
          } else {
            $scope.systemUsers.push(users[i]);
          }
        }
      }
    });
  }

  $scope.delete = function(id) {
    UsersService.deleteUser(id, function() {
      if( $state.current.name.indexOf('view')!=-1 ) {
        $state.go('^.list');
      }

      loadItems();
    });
  };

  $scope.onSubmit = function() {
    UsersService.upsertUser($scope.user, function() {
      $state.go('^.list');
    });
  };

  $scope.addUserToOrg = function(userId) {
    if($stateParams.organization) {
      UsersService.addToOrg(userId, $stateParams.organization, function() {
        loadItems();
      });
    }
  };

  $scope.removeUserFromOrg = function(userId) {
    if($stateParams.organization) {
      UsersService.removeFromOrg(userId, $stateParams.organization, function() {
        loadItems();
      });
    }
  }

  if($state.current.name.indexOf('add') != -1) {
    $scope.user = {};
    $scope.user.organizationId = $stateParams.organization?$stateParams.organization:'';
  } else {
    loadItems();
  }

  $scope.formFields = [{
    key: 'username',
    type: 'text',
    label: gettextCatalog.getString('Username'),
    required: true
  }, {
    key: 'email',
    type: 'email',
    label: gettextCatalog.getString('E-mail'),
    required: true
  }, {
    key: 'firstName',
    type: 'text',
    label: gettextCatalog.getString('First name'),
    required: true
  }, {
    key: 'lastName',
    type: 'text',
    label: gettextCatalog.getString('Last name'),
    required: true
  }];

  $scope.formOptions = {
    uniqueFormId: true,
    hideSubmit: false,
    submitCopy: gettextCatalog.getString('Save')
  };

});
