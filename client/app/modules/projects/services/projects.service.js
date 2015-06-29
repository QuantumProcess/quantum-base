'use strict';
var app = angular.module('com.module.projects');

app.service('ProjectsService', ['$state', 'CoreService', 'Project', 'Organization', 'Area',
  'gettextCatalog', function($state, CoreService, Project, Organization, Area, gettextCatalog) {

  this.getProjectsInOrg = function( orgId, callback) {

    if(orgId===undefined) {
      if(callback) {
        callback(Project.find());
      } else {
        return Project.find();
      }
    }
    else {

      Organization.findById({
        id:orgId,
        filter:{ include: { 'areas': [{'projects':['events']}] } }
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

  this.getProjectsInArea = function( areaId, callback) {

    Area.findById({
      id:areaId,
      filter:{ include:['projects','events'] }
    },function(area) {
        callback(area);
      },
      function(errorResponse) {
        console.error('Error',errorResponse);
      }
    );
  };

  this.getProject = function(id, callback) {
    return Project.findById({
      id: id,
      filter:{ include:['tasks','events'] }
    },function(project) {
        callback(project);
      },
      function(errorResponse) {
        console.error('Error',errorResponse);
      }
    );
  };

  this.upsertProject = function(project, orgId, areaId, cb) {

    if(orgId!=='') {
        project.organizationId = orgId;
    }
    //
    // if(areaId!=='') {
    //     project.areaId = areaId;
    // }

    Project.upsert(project, function() {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Project saved'), gettextCatalog.getString(
        'New project created!'));
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
