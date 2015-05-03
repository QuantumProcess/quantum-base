'use strict';
var app = angular.module('com.module.projects');

app.controller('ProjectsCtrl', function($scope, $state, $stateParams,
  CoreService, ProjectsService, gettextCatalog, Area, Project) {

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

    function loadItems() {
      $scope.areas = [];
      Area.find(function(areas) {
        angular.forEach(areas, function(area) {
          area.projects = Area.projects({
            id: area.id
          });
          this.push(area);
        }, $scope.areas);
      });

      // Project in no Areas
      $scope.projects = [];
      Project.find(function(projects) {
        angular.forEach(projects, function(project) {
          if(!project.areaId) {
            this.push(project);
          }
        }, $scope.projects);
      });

    }

    loadItems();

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
      ProjectsService.upsertProject($scope.project, function() {
        $scope.projects = ProjectsService.getProjects();
        $state.go('^.list');
      });
    };

    // $scope.projects = ProjectsService.getProjects();
    //
    // if ($stateParams.id) {
    //   $scope.project = ProjectsService.getProject($stateParams.id);
    // } else {
    //   $scope.project = {};
    // }

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
    type: 'text',
    label: gettextCatalog.getString('Area'),
    required: false
  }];

  $scope.formOptions = {
    uniqueFormId: true,
    hideSubmit: false,
    submitCopy: 'Save'
  };

});
