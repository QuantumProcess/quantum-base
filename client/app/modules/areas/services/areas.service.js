'use strict';
var app = angular.module('com.module.areas');

app.service('AreasService', ['$state', 'CoreService', 'Area', 'gettextCatalog', function($state,
  CoreService, Area, gettextCatalog) {

  this.getAreas = function() {
    return Area.find();
  };

  this.getArea = function(id) {
    return Area.findById({
      id: id
    });
  };

  this.upsertArea = function(area, cb) {
    Area.upsert(area, function() {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Area saved'), gettextCatalog.getString(
        'Your area is safe with us!'));
      cb();
    }, function(err) {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Error saving area '), gettextCatalog.getString(
        'This area could no be saved: ') + err);
    });
  };

  this.deleteArea = function(id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        Area.deleteById(id, function() {
          CoreService.toastSuccess(gettextCatalog.getString(
            'Area deleted'), gettextCatalog.getString(
            'Your area is deleted!'));
          cb();
        }, function(err) {
          CoreService.toastError(gettextCatalog.getString(
            'Error deleting area'), gettextCatalog.getString(
            'Your area is not deleted! ') + err);
        });
      },
      function() {
        return false;
      });
  };

}]);
