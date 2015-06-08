'use strict';
var app = angular.module('com.module.organizations');

app.controller('OrganizationsCtrl', function($scope, $state, $stateParams, OrganizationsService,
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
    OrganizationsService.upsertOrganization($scope.organization, function() {
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

});
