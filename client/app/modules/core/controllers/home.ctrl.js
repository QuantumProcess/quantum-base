'use strict';
/**
 * @ngdoc function
 * @name com.module.core.controller:HomeCtrl
 * @description Dashboard
 * @requires $scope
 * @requires $rootScope
 **/
angular.module('com.module.core')
  .controller('HomeCtrl', function($scope, $stateParams, $rootScope) {

    $scope.count = {};

    // $scope.principal = ($stateParams.organization==='admin')?'admin':'user';

    $scope.boxes = [];

    for (var i = 0, len = $rootScope.dashboardBox.length; i < len; i++) {
      $scope.boxes.push($rootScope.dashboardBox[i]);
      // if ($rootScope.dashboardBox[i].scope===undefined) continue;
      // if ($rootScope.dashboardBox[i].scope.indexOf($scope.principal) != -1) {
      //   $scope.boxes.push($rootScope.dashboardBox[i]);
      // }
    }

  });
