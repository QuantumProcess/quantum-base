'use strict';
var app = angular.module('com.module.tasks');

app.controller('TasksCtrl', function($scope, $state, $stateParams, TasksService,
  gettextCatalog) {

  $scope.formFields = [{
    key: 'title',
    type: 'text',
    label: gettextCatalog.getString('Title'),
    required: true
  }, {
    key: 'description',
    type: 'textarea',
    label: gettextCatalog.getString('Description'),
    required: false
  }, {
    key: 'projectId',
    type: 'text',
    label: gettextCatalog.getString('Project'),
    required: false
  }, {
    key: 'ownerId',
    type: 'text',
    label: gettextCatalog.getString('Owner'),
    required: true
  }];

  $scope.formOptions = {
    uniqueFormId: true,
    hideSubmit: false,
    submitCopy: 'Save'
  };

  $scope.delete = function(id) {
    TasksService.deleteTask(id, function() {
      $scope.tasks = TasksService.getTasks();
    });
  };

  $scope.onSubmit = function() {
    TasksService.upsertTask($scope.task, function() {
      $scope.tasks = TasksService.getTasks();
      $state.go('^.list');
    });
  };

  $scope.tasks = TasksService.getTasks();

  if ($stateParams.id) {
    $scope.task = TasksService.getTask($stateParams.id);
  } else {
    $scope.task = {};
  }

});
