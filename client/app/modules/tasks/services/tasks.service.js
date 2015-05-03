'use strict';
var app = angular.module('com.module.tasks');

app.service('TasksService', ['$state', 'CoreService', 'Task', 'gettextCatalog', function($state,
  CoreService, Task, gettextCatalog) {

  this.getTasks = function() {
    return Task.find();
  };

  this.getTask = function(id) {
    return Task.findById({
      id: id
    });
  };

  this.upsertTask = function(task, cb) {
    Task.upsert(task, function() {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Task saved'), gettextCatalog.getString(
        'Your task is safe with us!'));
      cb();
    }, function(err) {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Error saving task '), gettextCatalog.getString(
        'This task could no be saved: ') + err);
    });
  };

  this.deleteTask = function(id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        Task.deleteById(id, function() {
          CoreService.toastSuccess(gettextCatalog.getString(
            'Task deleted'), gettextCatalog.getString(
            'Your task is deleted!'));
          cb();
        }, function(err) {
          CoreService.toastError(gettextCatalog.getString(
            'Error deleting task'), gettextCatalog.getString(
            'Your task is not deleted! ') + err);
        });
      },
      function() {
        return false;
      });
  };

}]);
