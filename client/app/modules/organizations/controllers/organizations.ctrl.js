'use strict';
var app = angular.module('com.module.organizations');

app.controller('OrganizationsCtrl', function($rootScope, $scope, $state, $stateParams, OrganizationsService,
  gettextCatalog) {

  $scope.formFields = [{
    key: 'name',
    type: 'text',
    label: gettextCatalog.getString('Name'),
    required: true
  }, {
    key: 'lema',
    type: 'text',
    label: gettextCatalog.getString('Lema'),
    required: false
  }, {
    key: 'info',
    type: 'textarea',
    label: gettextCatalog.getString('Info'),
    required: false
  }];

  $scope.formOptions = {
    uniqueFormId: true,
    hideSubmit: false,
    submitCopy: 'Save'
  };

  $scope.delete = function(id) {
    OrganizationsService.deleteOrganization(id, function() {
      $scope.organizations = OrganizationsService.getOrganizations();
    });
  };

  $scope.onSubmit = function() {
    OrganizationsService.upsertOrganization($scope.organization, function(org) {
      $scope.organizations = OrganizationsService.getOrganizations();
      $state.go('^.list');
    });
  };

  $scope.organizations = OrganizationsService.getOrganizations();

  if ($stateParams.id) {
    $scope.organization = OrganizationsService.getOrganization($stateParams.id);
  } else {
    $scope.organization = {};
  }

  //$scope.principal = ($stateParams.organization==='admin')?'admin':'user';
  // solo admin accede a esta pantalla
  $scope.boxes = [];

  for (var i = 0, len = $rootScope.dashboardBox.length; i < len; i++) {
    if ($rootScope.dashboardBox[i].scope===undefined) continue;
    if ($rootScope.dashboardBox[i].scope.indexOf('user') != -1) {
      $scope.boxes.push($rootScope.dashboardBox[i]);
    }
  }

});
