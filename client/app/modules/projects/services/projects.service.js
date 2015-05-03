'use strict';
var app = angular.module('com.module.projects');

app.service('ProjectsService', ['$state', 'CoreService', 'Project', 'gettextCatalog', function($state,
  CoreService, Project, gettextCatalog) {

  this.getProjects = function() {
    return Project.find();
  };

  this.getProject = function(id) {
    return Project.findById({
      id: id
    });
  };

  this.upsertProject = function(project, cb) {
    Project.upsert(project, function() {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Project saved'), gettextCatalog.getString(
        'Your project is safe with us!'));
      cb();
    }, function(err) {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Error saving project '), gettextCatalog.getString(
        'This project could no be saved: ') + err);
    });
  };

  this.deleteProject = function(id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        Project.deleteById(id, function() {
          CoreService.toastSuccess(gettextCatalog.getString(
            'Project deleted'), gettextCatalog.getString(
            'Your project is deleted!'));
          cb();
        }, function(err) {
          CoreService.toastError(gettextCatalog.getString(
            'Error deleting project'), gettextCatalog.getString(
            'Your project is not deleted! ') + err);
        });
      },
      function() {
        return false;
      });
  };

}]);
