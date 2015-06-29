'use strict';
var app = angular.module('com.module.subtasks');

app.controller('SubtasksCtrl', function($scope, $rootScope, $state, $stateParams, SubtasksService,
  gettextCatalog, $window) {

  $scope.formFields = [{
    key: 'description',
    type: 'text',
    label: gettextCatalog.getString('To do'),
    required: true
  }, {
    key: 'priority',
    type: 'select',
    label: gettextCatalog.getString('Priority'),
    required: true,
    options: [{'name':'High - 1', 'value':1},{'name':'Medium - 2', 'value':2},{'name':'Low - 3', 'value':3}]
  }];

  $scope.formOptions = {
    uniqueFormId: true,
    hideSubmit: false,
    submitCopy: 'Save'
  };

  $scope.delete = function(id) {
    SubtasksService.deleteSubtask(id, function() {
      // $scope.tasks = TasksService.getTasks();
      if( $state.current.name.indexOf('view')!=-1 ) {
        loadItems();
        $window.history.back();
        // $state.go('^.list');
      }

      loadItems();
    });
  };

  $scope.onSubmit = function() {
    SubtasksService.upsertSubtask($scope.subtask, function() {
      loadItems();
      $window.history.back();
      // $state.go('^.list');
    });
  };

  var loadItems = function() {

    if ($stateParams.id) {
      // Ver una sola subtarea
      SubtasksService.getSubtask($stateParams.id, function(subtask) {
        $scope.subtask = subtask;
      });
    } else if ($stateParams.task) {
      // Lista de subtareas dentro de una tarea
      SubtasksService.getSubtasksInTask( $stateParams.task, function(task) {
        $scope.tasks = [task];
      });
    } else if ($stateParams.organization) {

      console.log('toy en getTasksInOrg');
      // Lista de tareas en la Organizacion
      // SubtasksService.getTasksInOrg( $stateParams.organization, function(areas) {
      //   $scope.areas = areas;
      // });
    } else {
      // Por defecto, no hay proyectos
      $scope.subtask = {};
    }
  }

  if($state.current.name.indexOf('add') != -1) {
    $scope.subtask = {};
    $scope.subtask.taskId = parseInt($stateParams.task);
    $scope.subtask.priority = 1;
  } else {
    loadItems();
  }

});
