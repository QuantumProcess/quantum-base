'use strict';
var app = angular.module('com.module.organizations');

app.service('OrganizationsService', ['$state', 'CoreService', 'Organization', 'gettextCatalog', function($state,
  CoreService, Organization, gettextCatalog) {

  this.getOrganizations = function() {
    return Organization.find();
  };

  this.getOrganization = function(id) {
    return Organization.findById({
      id: id
    });
  };

  this.upsertOrganization = function(organization, cb) {
    Organization.upsert(organization, function() {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Organization saved'), gettextCatalog.getString(
        'Your organization is safe with us!'));
      cb();
    }, function(err) {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Error saving organization '), gettextCatalog.getString(
        'This organization could no be saved: ') + err);
    });
  };

  this.deleteOrganization = function(id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        Organization.deleteById(id, function() {
          CoreService.toastSuccess(gettextCatalog.getString(
            'Organization deleted'), gettextCatalog.getString(
            'Your organization is deleted!'));
          cb();
        }, function(err) {
          CoreService.toastError(gettextCatalog.getString(
            'Error deleting organization'), gettextCatalog.getString(
            'Your organization is not deleted! ') + err);
        });
      },
      function() {
        return false;
      });
  };

}]);
