'use strict';
var app = angular.module('com.module.areas');

app.controller('AreasCtrl', function($scope, $state, $stateParams, AreasService,
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
  }, {
    key: 'organizationId',
    type: 'text',
    label: gettextCatalog.getString('Organization'),
    required: true
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
    AreasService.upsertArea($scope.area, function() {
      $scope.areas = AreasService.getAreas();
      $state.go('^.list');
    });
  };

  $scope.areas = AreasService.getAreas();

  if ($stateParams.id) {
    $scope.area = AreasService.getArea($stateParams.id);
  } else {
    $scope.area = {};
  }

});
