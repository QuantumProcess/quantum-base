'use strict';
var app = angular.module('com.module.projects');

app.controller('ProjectsCtrl', function($scope, $state, $stateParams,
  CoreService, ProjectsService, gettextCatalog, Project, Event) {

    var checkOrganization = function(setCurrentOrgData) {
      if ( typeof $scope.organization != 'undefined' ) {
        setCurrentOrgData();
      } else {
        setTimeout(function () {
          checkOrganization(setCurrentOrgData);
        }, 100);
      }
    }

    checkOrganization( function() {

      for(var i=0; i<$scope.organization.areas.length; i++) {
        $scope.organization.areas[i].value = $scope.organization.areas[i].id;
      }

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
        options: $scope.organization.areas
      }];
    });

    if($state.current.name.indexOf('add') != -1) {
      $scope.project = {};
      $scope.project.areaId = parseInt($stateParams.area?$stateParams.area:$scope.organization.areas[0].id);
    }

    var loadItems = function() {
      if ($stateParams.id) {
        // Descripcion de un solo proyecto
        ProjectsService.getProject($stateParams.id, function(project) {
          $scope.project = project;
        });
      } else if ($stateParams.area) {
        // Lista de proyectos dentro de un Area
        ProjectsService.getProjectsInArea( $stateParams.area, function(area) {
          $scope.areas = [area];
        });
      } else if ($stateParams.organization) {
        // Lista de proyectos de la Organizacion
        ProjectsService.getProjectsInOrg( $stateParams.organization, function(areas) {
          $scope.areas = areas;
        });
      } else {
        // Por defecto, no hay proyectos
        $scope.project = {};
      }
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

              if( $state.current.name.indexOf('view')!=-1 ) {
                $state.go('^.list');
              }

              loadItems();
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

    $scope.deleteEvent = function(id) {
      CoreService.confirm(gettextCatalog.getString('Are you sure?'),
        gettextCatalog.getString('Deleting this cannot be undone'),
        function() {
          Event.deleteById(id, function() {
            CoreService.toastSuccess(gettextCatalog.getString(
              'Event deleted'), gettextCatalog.getString(
              'Your event is deleted!'));
              //
              // if( $state.current.name.indexOf('view')!=-1 ) {
              //   $state.go('^.list');
              // }

              loadItems();
              
          }, function(err) {
            CoreService.toastError(gettextCatalog.getString(
              'Error deleting event'), gettextCatalog.getString(
              'Your event is not deleted: ') + err);
          });
        },
        function() {
          return false;
        });
    };

    $scope.onSubmit = function() {
      var orgId = $stateParams.organization?$stateParams.organization:'';
      var areaId = $stateParams.area?$stateParams.area:'';

      ProjectsService.upsertProject($scope.project, orgId, areaId, function() {
        $state.go('^.list');
      });
    };

  $scope.formOptions = {
    uniqueFormId: true,
    hideSubmit: false,
    submitCopy: 'Save'
  };

});
