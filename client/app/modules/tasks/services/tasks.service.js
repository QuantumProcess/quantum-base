'use strict';
var app = angular.module('com.module.tasks');

app.service('TasksService', ['$state', 'CoreService', 'Task', 'Project', 'Organization', 'Subtask', 'gettextCatalog',
  function($state, CoreService, Task, Project, Organization, Subtask, gettextCatalog) {

    this.getTasksInOrg = function( orgId, callback) {

      if(orgId===undefined) {
        if(callback) {
          callback(Task.find());
        } else {
          return Task.find();
        }
      }
      else {
        Organization.findById({
          id:orgId,
          filter:{ include: { 'areas': [{'projects':['tasks']},'tasks'] } }
        },
          function(org) {
            callback(org.areas);
          },
          function(errorResponse) {
            console.error('Error',errorResponse);
          }
        );
      }
    };

  this.getTasksInProject = function( projectId, callback) {

    Project.findById({
      id:projectId,
      filter:{ include:'tasks' }
    },function(project) {
        callback(project);
      },
      function(errorResponse) {
        console.error('Error',errorResponse);
      }
    );
  };

  this.getTask = function(id, callback) {
    return Task.findById({
      id: id,
      filter:{ include:'subtasks' }
    },function(task) {
        callback(task);
      },
      function(errorResponse) {
        console.error('Error',errorResponse);
      }
    );
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

  this.changeSubtaskState = function(subtaskId, cb) {
    Subtask.findById({
      id:subtaskId
    }, function(subtask) {
      subtask.done = !subtask.done;
      Subtask.upsert(subtask, function() {
        cb();
      }, function(err) {
        CoreService.toastSuccess(gettextCatalog.getString(
          'Error saving Subtask '), gettextCatalog.getString(
          'This task could no be saved: ') + err);
          cb(err);
      });
    }, function(errorResponse) {
      console.error('Error',errorResponse);
    });
  };

  this.deleteSubtask = function(subtaskId, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        Subtask.deleteById(subtaskId, function() {
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
