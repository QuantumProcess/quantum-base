'use strict';
var app = angular.module('com.module.projects');

app.controller('ProjectsCtrl', function($scope, $rootScope, $state, $stateParams,
  CoreService, ProjectsService, gettextCatalog, Project) {

    var projectId = $stateParams.id;
    var areaId = $stateParams.areaId;

    if (projectId) {
      $scope.project = Project.findById({
        id: projectId
      }, function(project) {
        project.area = Project.area({
          id: project.id
        });
      }, function(err) {
        console.log(err);
      });
    } else {
      $scope.project = {};
    }

    if (areaId) {
      $scope.project.areaId = areaId;
    }

    ProjectsService.getProjectsInAreas( $rootScope.currentOrganization, function(areas) {
      $scope.areas = areas;

      var formAreas = [];

      $scope.areas.forEach(function(area){
        formAreas.push({name: area.name, value: area.id});
      });

      $scope.formFields = [{
        key: 'name',
        type: 'text',
        label: gettextCatalog.getString('Name'),
        required: true
      }, {
        key: 'description',
        type: 'textarea',
        label: gettextCatalog.getString('Description'),
        required: false
      }, {
        key: 'info',
        type: 'textarea',
        label: gettextCatalog.getString('Info'),
        required: false
      }, {
        key: 'areaId',
        type: 'select',
        label: gettextCatalog.getString('Area'),
        required: false,
        options: formAreas
      }];
    });

    //TODO: List Non Area Projects
    //TODO: List General Projects (outside organizations)

    if ($stateParams.id) {
      $scope.project = ProjectsService.getProject($stateParams.id);
    } else if ($stateParams.area) {
      ProjectsService.getProjectsByArea( $stateParams.area, function(projects) {
        $scope.projects = projects;
      });
    } else {
      $scope.project = {};
    }

    $scope.delete = function(id) {
      CoreService.confirm(gettextCatalog.getString('Are you sure?'),
        gettextCatalog.getString('Deleting this cannot be undone'),
        function() {
          Project.deleteById(id, function() {
            CoreService.toastSuccess(gettextCatalog.getString(
              'Project deleted'), gettextCatalog.getString(
              'Your project is deleted!'));
            loadItems();
            $state.go('app.projects.list');
          }, function(err) {
            CoreService.toastError(gettextCatalog.getString(
              'Error deleting project'), gettextCatalog.getString(
              'Your project is not deleted: ') + err);
          });
        },
        function() {
          return false;
        });
    };

    // $scope.delete = function(id) {
    //   ProjectsService.deleteProject(id, function() {
    //     $scope.projects = ProjectsService.getProjects();
    //   });
    // };

    $scope.onSubmit = function() {
      var orgId = $rootScope.currentOrganization?$rootScope.currentOrganization:'';

      ProjectsService.upsertProject($scope.project, orgId, function() {
        $scope.projects = ProjectsService.getProjects();
        $state.go('^.list');
      });
    };

  $scope.formOptions = {
    uniqueFormId: true,
    hideSubmit: false,
    submitCopy: 'Save'
  };

});
