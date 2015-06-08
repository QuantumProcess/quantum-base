'use strict';
var app = angular.module('com.module.qgroups');

app.controller('QgroupsCtrl', function($scope, $state, $stateParams, QgroupsService,
  gettextCatalog) {

  $scope.qgroups = QgroupsService.getQgroups();

  if ($stateParams.id) {
    $scope.qgroup = QgroupsService.getQgroup($stateParams.id);
  } else {
    $scope.qgroup = {};
  }

  // function loadItems() {
  //   $scope.organizations = [];
  //   Organization.find(function(orgs) {
  //     angular.forEach(orgs, function(org) {
  //       org.val = org.id;
  //       org.qgroups = Organization.groups({
  //         id: org.id
  //       });
  //       this.push(org);
  //     }, $scope.organizations);
  //   }, function() {
  //     // $scope.loading = false;
  //   });
  // }

  //loadItems();


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
    submitCopy: 'Save'
  };

  $scope.delete = function(id) {
    QgroupsService.deleteQgroup(id, function() {
      $scope.qgroups = QgroupsService.getQgroups();
    });
  };

  $scope.onSubmit = function() {
    QgroupsService.upsertQgroup($scope.qgroup, function() {
      $scope.qgroups = QgroupsService.getQgroups();
      $state.go('^.list');
    });
  };

});
