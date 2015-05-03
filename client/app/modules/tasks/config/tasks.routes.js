'use strict';
var app = angular.module('com.module.tasks');

app.config(function($stateProvider) {
  $stateProvider.state('app.tasks', {
    abstract: true,
    url: '/tasks',
    templateUrl: 'modules/tasks/views/main.html'
  }).state('app.tasks.list', {
    url: '',
    templateUrl: 'modules/tasks/views/list.html',
    controller: 'TasksCtrl'
  }).state('app.tasks.add', {
    url: '/add',
    templateUrl: 'modules/tasks/views/form.html',
    controller: 'TasksCtrl'
  }).state('app.tasks.edit', {
    url: '/:id/edit',
    templateUrl: 'modules/tasks/views/form.html',
    controller: 'TasksCtrl'
  }).state('app.tasks.view', {
    url: '/:id',
    templateUrl: 'modules/tasks/views/view.html',
    controller: 'TasksCtrl'
  });
});
