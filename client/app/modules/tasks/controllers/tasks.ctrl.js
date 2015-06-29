'use strict';
var app = angular.module('com.module.tasks');

app.controller('TasksCtrl', function($scope, $rootScope, $state, $stateParams, TasksService,
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
  }];

  // {
  //   key: 'ownerId',
  //   type: 'text',
  //   label: gettextCatalog.getString('Owner'),
  //   required: false
  // }, {
  //   key: 'projectId',
  //   type: 'text',
  //   label: gettextCatalog.getString('Project'),
  //   required: false
  // },

  $scope.formOptions = {
    uniqueFormId: true,
    hideSubmit: false,
    submitCopy: 'Save'
  };

  $scope.delete = function(id) {
    TasksService.deleteTask(id, function() {
      // $scope.tasks = TasksService.getTasks();
      if( $state.current.name.indexOf('view')!=-1 ) {
        $state.go('^.list');
      }

      loadItems();
    });
  };

  $scope.onSubmit = function() {
    TasksService.upsertTask($scope.task, function() {
      $state.go('^.list');
    });
  };

  $scope.changeSubtaskState = function(subtaskId) {
    TasksService.changeSubtaskState(subtaskId, function() {
      loadItems();
    });
  }

  $scope.deleteSubtask = function(subtaskId) {
    TasksService.deleteSubtask(subtaskId, function() {
      loadItems();
    });
  }

  var loadItems = function() {
    if ($stateParams.id) {
      // Ver una sola tarea
      TasksService.getTask($stateParams.id, function(task) {
        $scope.task = task;
      });
    } else if ($stateParams.project) {
      // Lista de tareas dentro de un Proyecto
      TasksService.getTasksInProject( $stateParams.project, function(project) {
        $scope.projects = [project];
      });
    } else if ($stateParams.organization) {
      // Lista de tareas en la Organizacion
      TasksService.getTasksInOrg( $stateParams.organization, function(areas) {
        $scope.areas = areas;
      });
    } else {
      // Por defecto, no hay proyectos
      $scope.task = {};
    }
  }

  if($state.current.name.indexOf('add') != -1) {
    $scope.task = {};
    $scope.task.projectId = parseInt($stateParams.project);
  } else {
    loadItems();
  }

});
