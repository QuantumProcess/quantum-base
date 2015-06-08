'use strict';
var app = angular.module('com.module.organizations');

app.config(function($stateProvider) {
  $stateProvider.state('app.organizations', {
    abstract: true,
    url: '/organizations',
    templateUrl: 'modules/organizations/views/main.html'
  }).state('app.organizations.list', {
    url: '',
    templateUrl: 'modules/organizations/views/list.html',
    controller: 'OrganizationsCtrl'
  }).state('app.organizations.add', {
    url: '/add',
    templateUrl: 'modules/organizations/views/form.html',
    controller: 'OrganizationsCtrl'
  }).state('app.organizations.edit', {
    url: '/:id/edit',
    templateUrl: 'modules/organizations/views/form.html',
    controller: 'OrganizationsCtrl'
  }).state('app.organizations.view', {
    url: '/:id',
    templateUrl: 'modules/organizations/views/view.html',
    controller: 'OrganizationsCtrl'
  });
});
