'use strict';
var app = angular.module('com.module.subtasks');

app.service('SubtasksService', ['$state', 'CoreService', 'Subtask', 'Task', 'gettextCatalog',
  function($state, CoreService, Subtask, Task, gettextCatalog) {

    this.getTasksInOrg = function( orgId, callback) {

      // if(orgId===undefined) {
      //   if(callback) {
      //     callback(Task.find());
      //   } else {
      //     return Task.find();
      //   }
      // }
      // else {
      //   Organization.findById({
      //     id:orgId,
      //     filter:{ include: { 'areas': [{'projects':['tasks']},'tasks'] } }
      //   },
      //     function(org) {
      //       callback(org.areas);
      //     },
      //     function(errorResponse) {
      //       console.error('Error',errorResponse);
      //     }
      //   );
      // }
    };

  this.getSubtasksInTask = function( taskId, callback) {
    Task.findById({
      id:taskId
    }, function(task) {
      callback(task);
    }, function(errorResponse) {
      console.error('Error',errorResponse);
    });
  };

  this.getSubtask = function(id, callback) {
    return Subtask.findById({
      id: id
    },function(subtask) {
        callback(subtask);
      },
      function(errorResponse) {
        console.error('Error',errorResponse);
      }
    );
  };

  this.upsertSubtask = function(subtask, cb) {
    Subtask.upsert(subtask, function() {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Subtask saved'), gettextCatalog.getString(
        'Your Subtask is safe with us!'));
      cb();
    }, function(err) {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Error saving Subtask '), gettextCatalog.getString(
        'This task could no be saved: ') + err);
    });
  };

  this.changeState = function(subtask, cb) {
    subtask.done = !subtask.done;
    this.upsertSubtask(subtask, cb);
  };

  this.deleteSubtask = function(id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        Subtask.deleteById(id, function() {
          CoreService.toastSuccess(gettextCatalog.getString(
            'Subtask deleted'), gettextCatalog.getString(
            'Your Subtask is deleted!'));
          cb();
        }, function(err) {
          CoreService.toastError(gettextCatalog.getString(
            'Error deleting Subtask'), gettextCatalog.getString(
            'Your Subtask is not deleted! ') + err);
        });
      },
      function() {
        return false;
      });
  };

}]);
