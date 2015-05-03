'use strict';
var app = angular.module('com.module.qgroups');

app.service('QgroupsService', ['$state', 'CoreService', 'Qgroup', 'gettextCatalog', function($state,
  CoreService, Qgroup, gettextCatalog) {

  this.getQgroups = function() {
    return Qgroup.find();
  };

  this.getQgroup = function(id) {
    return Qgroup.findById({
      id: id
    });
  };

  this.upsertQgroup = function(qgroup, cb) {
    Qgroup.upsert(qgroup, function() {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Qgroup saved'), gettextCatalog.getString(
        'Your qgroup is safe with us!'));
      cb();
    }, function(err) {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Error saving qgroup '), gettextCatalog.getString(
        'This qgroup could no be saved: ') + err);
    });
  };

  this.deleteQgroup = function(id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        Qgroup.deleteById(id, function() {
          CoreService.toastSuccess(gettextCatalog.getString(
            'Qgroup deleted'), gettextCatalog.getString(
            'Your qgroup is deleted!'));
          cb();
        }, function(err) {
          CoreService.toastError(gettextCatalog.getString(
            'Error deleting qgroup'), gettextCatalog.getString(
            'Your qgroup is not deleted! ') + err);
        });
      },
      function() {
        return false;
      });
  };

}]);
