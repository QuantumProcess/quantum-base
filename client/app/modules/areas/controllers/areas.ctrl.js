'use strict';
var app = angular.module('com.module.areas');

app.controller('AreasCtrl', function($scope, $rootScope, $state, $stateParams, AreasService,
  gettextCatalog) {

  $scope.formFields = [{
    key: 'name',
    type: 'text',
    label: gettextCatalog.getString('Name'),
    required: true
  }, {
    key: 'description',
    type: 'textarea',
    label: gettextCatalog.getString('Description'),
    required: false
  }];

  $scope.formOptions = {
    uniqueFormId: true,
    hideSubmit: false,
    submitCopy: 'Save'
  };

  $scope.delete = function(id) {
    AreasService.deleteArea(id, function() {
      $scope.areas = AreasService.getAreas();
    });
  };

  $scope.onSubmit = function() {
    var orgId = $rootScope.currentOrganization?$rootScope.currentOrganization:'';

    AreasService.upsertArea($scope.area, orgId, function() {
      $scope.areas = AreasService.getAreas();
      $state.go('^.list');
    });
  };

  AreasService.getAreas( $rootScope.currentOrganization, function(areas) {
    $scope.areas = areas;
  });

  if ($stateParams.id) {
    $scope.area = AreasService.getArea($stateParams.id);
  } else {
    $scope.area = {};
  }

});
