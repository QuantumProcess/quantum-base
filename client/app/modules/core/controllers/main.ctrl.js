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
    CoreService, User, Organization, gettextCatalog) {

    $scope.currentUser = User.getCurrent();

    $scope.currentUser.$promise.then(function(user){
      User.findById({
        id:user.id,
        filter:{ include: ['roles', {'organizations': ['areas']}] }
      },
        function(user) {

          var admin = false;

          for(var i=0; i<user.roles.length; i++) {
            if(user.roles[i].name==='admin') {
              admin = true;
            }
          }

          $scope.organization = null;

          if(admin) {
            $scope.isAdmin = true;
            Organization.find(
              {
                filter:{ include: 'areas' }
              }, function(orgs){
                $scope.organizations = orgs;
                setCurrentOrganization();
                $scope.blockUser = false;
            });
          } else {
            $scope.isAdmin = false;
            if(user.organizations.length) {
              $scope.organizations = user.organizations;
              setCurrentOrganization();
            } else {
              $scope.blockUser = true;
            }
          }

        },
        function(errorResponse) {
          console.error('Error',errorResponse);
        }
      );
    });

    $scope.menuoptions = [];

    for (var i = 0, len = $rootScope.menu.length; i < len; i++) {
      $scope.menuoptions.push($rootScope.menu[i]);
      // if ($rootScope.menu[i].scope===undefined) continue;
      // if ($rootScope.menu[i].scope.indexOf($scope.principal) != -1) {
      //   $scope.menuoptions.push($rootScope.menu[i]);
      // }
    }

    var setCurrentOrganization = function() {
      for (var i = 0, len = $scope.organizations.length; i < len; i++) {
        if ($scope.organizations[i].id == $stateParams.organization) {
          $scope.organization = $scope.organizations[i];
          break;
        }
      }
      if($scope.organization==null && $scope.organizations.length) {
        $scope.organization = $scope.organizations[0];
      }

      if(!$stateParams.organization) {
        $scope.setOrganization();
      }
    };

    $scope.setOrganization = function() {
      $state.go('app.home', { organization: $scope.organization.id });
    }

    $scope.showByScope=function(scope){
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
