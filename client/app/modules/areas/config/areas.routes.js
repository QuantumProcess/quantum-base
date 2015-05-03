'use strict';
var app = angular.module('com.module.areas');

app.config(function($stateProvider) {
  $stateProvider.state('app.areas', {
    abstract: true,
    url: '/areas',
    templateUrl: 'modules/areas/views/main.html'
  }).state('app.areas.list', {
    url: '',
    templateUrl: 'modules/areas/views/list.html',
    controller: 'AreasCtrl'
  }).state('app.areas.add', {
    url: '/add',
    templateUrl: 'modules/areas/views/form.html',
    controller: 'AreasCtrl'
  }).state('app.areas.edit', {
    url: '/:id/edit',
    templateUrl: 'modules/areas/views/form.html',
    controller: 'AreasCtrl'
  }).state('app.areas.view', {
    url: '/:id',
    templateUrl: 'modules/areas/views/view.html',
    controller: 'AreasCtrl'
  });
});
