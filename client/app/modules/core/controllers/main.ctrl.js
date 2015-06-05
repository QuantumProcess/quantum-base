'use strict';
/**
 * @ngdoc function
 * @name com.module.core.controller:MainCtrl
 * @description Login Controller
 * @requires $scope
 * @requires $state
 * @requires $location
 * @requires CoreService
 * @requires AppAuth
 * @requires User
 * @requires gettextCatalog
 **/
angular.module('com.module.core')
  .controller('MainCtrl', function($scope, $rootScope, $state, $stateParams, $location,
    CoreService, User, gettextCatalog) {

    $scope.currentUser = User.getCurrent();
    $rootScope.currentOrganization = $stateParams.orgId;

    $scope.currentUser.$promise.then(function(user){
      User.findById({
        id:user.id,
        filter:{ include:'organizations' }
      },
        function(user) {
          $scope.organizations = user.organizations;
          for (var i = 0, len = $scope.organizations.length; i < len; i++) {
            if ($scope.organizations[i].id == $rootScope.currentOrganization) {
              $scope.organization = $scope.organizations[i];
              break;
            }
          }
        },
        function(errorResponse) {
          console.error('Error',errorResponse);
        }
      );
    });

    $scope.menuoptions = $rootScope.menu;

    $scope.setOrganization = function(id) {
      $state.go($state.current, { orgId: $scope.organization.id }, {reload: true});
    }

    $scope.showByScope=function(scope){
      console.log(scope);
      switch (scope) {
        case 'Organizations':
          if($scope.organizations.length)
          return true; else return false;
          break;
        default:

      }
    };

    $scope.logout = function() {
      User.logout(function() {
        $state.go('login');
        CoreService.toastSuccess(gettextCatalog.getString('Logged out'),
          gettextCatalog.getString('You are logged out!'));
      });
    };

  });
