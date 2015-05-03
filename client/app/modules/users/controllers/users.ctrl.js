'use strict';
var app = angular.module('com.module.users');

app.controller('UsersCtrl', function($scope, $stateParams, $state, CoreService,
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

  // muestra todos los users sin ubicarlos en sus orgs
  // $scope.loading = true;
  // $scope.users = User.find({
  //   filter: {
  //     include: ['roles']
  //   }
  // }, function() {
  //   $scope.loading = false;
  // });


  // $scope.loading = true;
  function loadItems() {
    $scope.organizations = [];
    Organization.find(function(orgs) {
      angular.forEach(orgs, function(org) {
        org.val = org.id;
        org.users = Organization.users({
          id: org.id
        });
        this.push(org);
      }, $scope.organizations);
    }, function() {
      // $scope.loading = false;
    });

    // General System Users
    $scope.users = [];
    User.find(function(users) {
      angular.forEach(users, function(user) {
        if(!user.organizationId) {
          this.push(user);
        }
      }, $scope.users);
    });

  }

  loadItems();

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
    User.upsert($scope.user, function() {
      CoreService.toastSuccess(gettextCatalog.getString('User saved'),
        gettextCatalog.getString('This user is save!'));
      $state.go('^.list');
    }, function(err) {
      CoreService.toastError(gettextCatalog.getString(
        'Error saving user: ', +err));
    });
  };

  // var orgs = Organization.find();
  // console.log(orgs);
  // var organizations;
  // Organization.find(function(orgs) {
  //   angular.forEach(orgs, function(org) {
  //     org.value = org.id;
  //     this.push(org);
  //   }, organizations);
  // });


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
  }, {
    key: 'organizationId',
    type: 'select',
    label: gettextCatalog.getString('Organization'),
    options: $scope.organizations,
    required: false
  }];

  $scope.formOptions = {
    uniqueFormId: true,
    hideSubmit: false,
    submitCopy: gettextCatalog.getString('Save')
  };

});
