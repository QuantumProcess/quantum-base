'use strict';
var app = angular.module('com.module.subtasks');

app.config(function($stateProvider) {
  $stateProvider.state('app.subtasks', {
    abstract: true,
    url: '/subtasks',
    templateUrl: 'modules/subtasks/views/main.html'

  }).state('app.subtasks.list', {
    url: '?task',
    templateUrl: 'modules/subtasks/views/list.html',
    controller: 'SubtasksCtrl'

  }).state('app.subtasks.add', {
    url: '/add?task',
    templateUrl: 'modules/subtasks/views/form.html',
    controller: 'SubtasksCtrl'

  }).state('app.subtasks.edit', {
    url: '/:id/edit',
    templateUrl: 'modules/subtasks/views/form.html',
    controller: 'SubtasksCtrl'

  }).state('app.subtasks.view', {
    url: '/:id',
    templateUrl: 'modules/subtasks/views/view.html',
    controller: 'SubtasksCtrl'

  });
});
