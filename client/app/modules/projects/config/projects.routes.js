'use strict';
var app = angular.module('com.module.projects');

app.config(function($stateProvider) {
  $stateProvider.state('app.projects', {
    abstract: true,
    url: '/projects',
    templateUrl: 'modules/projects/views/main.html'

  }).state('app.projects.view', {
    url: '/:id',
    templateUrl: 'modules/projects/views/view.html',
    controller: 'ProjectsCtrl'

  }).state('app.projects.list', {
    url: '?area',
    templateUrl: 'modules/projects/views/list.html',
    controller: 'ProjectsCtrl'

  }).state('app.projects.add', {
    url: '/add?area',
    templateUrl: 'modules/projects/views/form.html',
    controller: 'ProjectsCtrl'

  }).state('app.projects.edit', {
    url: '/:id/edit',
    templateUrl: 'modules/projects/views/form.html',
    controller: 'ProjectsCtrl'

  });
});
