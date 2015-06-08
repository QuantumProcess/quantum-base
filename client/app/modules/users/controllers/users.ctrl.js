'use strict';
var app = angular.module('com.module.users');

app.controller('UsersCtrl', function($scope, $rootScope, $stateParams, $state, CoreService,
  User, gettextCatalog, Organization) {

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

  // function loadItems() {
  //   $scope.users = User.find();
  // }
  // loadItems();

  function getUsers() {
    var orgId = $rootScope.currentOrganization;

    if(orgId===undefined) {
      $scope.users = User.find();
    }
    else {
      Organization.findById({
        id:orgId,
        filter:{ include:'members' }
      },
        function(org) {
          $scope.users = org.members;
          $scope.loading = false;
        },
        function(errorResponse) {
          console.error('Error',errorResponse);
        }
      );
    }
  }

  getUsers();

  $scope.delete = function(id) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        User.deleteById(id, function() {
            CoreService.toastSuccess(gettextCatalog.getString(
              'User deleted'), gettextCatalog.getString(
              'Your user is deleted!'));
            $state.go('app.users.list');
          },
          function(err) {
            CoreService.toastError(gettextCatalog.getString(
              'Error deleting user'), gettextCatalog.getString(
              'Your user is not deleted:' + err));
          });
      },
      function() {
        return false;
      });
  };

  $scope.onSubmit = function() {
    $scope.user.organizationId = $rootScope.currentOrganization?$rootScope.currentOrganization:'';

    User.upsert($scope.user, function() {
      CoreService.toastSuccess(gettextCatalog.getString('User saved'),
        gettextCatalog.getString('This user is save!'));
      $state.go('^.list');
    }, function(err) {
      CoreService.toastError(gettextCatalog.getString(
        'Error saving user: ', +err));
    });
  };

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
