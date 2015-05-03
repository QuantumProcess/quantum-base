'use strict';
var app = angular.module('com.module.qgroups');

app.config(function($stateProvider) {
  $stateProvider.state('app.qgroups', {
    abstract: true,
    url: '/qgroups',
    templateUrl: 'modules/qgroups/views/main.html'
  }).state('app.qgroups.list', {
    url: '',
    templateUrl: 'modules/qgroups/views/list.html',
    controller: 'QgroupsCtrl'
  }).state('app.qgroups.add', {
    url: '/add',
    templateUrl: 'modules/qgroups/views/form.html',
    controller: 'QgroupsCtrl'
  }).state('app.qgroups.edit', {
    url: '/:id/edit',
    templateUrl: 'modules/qgroups/views/form.html',
    controller: 'QgroupsCtrl'
  }).state('app.qgroups.view', {
    url: '/:id',
    templateUrl: 'modules/qgroups/views/view.html',
    controller: 'QgroupsCtrl'
  });
});
