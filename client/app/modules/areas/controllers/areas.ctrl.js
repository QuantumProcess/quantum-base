'use strict';
var app = angular.module('com.module.areas');

app.controller('AreasCtrl', function($scope, $rootScope, $state, $stateParams, AreasService,
  UsersService, gettextCatalog, Event, CoreService) {

  // UsersService.getOrganizationUsers( $stateParams.organization, function(users) {
  //
  //   for(var i=0; i<users.length; i++) {
  //     users[i].name = users[i].firstName + ' ' + users[i].lastName;
  //     users[i].value = users[i].id;
  //   }
  //
  //   $scope.formFields = [{
  //     key: 'name',
  //     type: 'text',
  //     label: gettextCatalog.getString('Name'),
  //     required: true
  //   }, {
  //     key: 'description',
  //     type: 'textarea',
  //     label: gettextCatalog.getString('Description'),
  //     required: false
  //   }, {
  //     key: 'in_charge',
  //     type: 'select',
  //     label: gettextCatalog.getString('In Charge'),
  //     required: false,
  //     options: users
  //   }];
  // });

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
  }];

  $scope.formOptions = {
    uniqueFormId: true,
    hideSubmit: false,
    submitCopy: 'Save'
  };

  $scope.delete = function(id) {
    AreasService.deleteArea(id, function() {
      if( $state.current.name.indexOf('view')!=-1 ) {
        $state.go('^.list');
      }
      loadItems();
    });
  };

  $scope.deleteProject = function(id) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        Project.deleteById(id, function() {
          CoreService.toastSuccess(gettextCatalog.getString(
            'Project deleted'), gettextCatalog.getString(
            'Your project is deleted!'));

            // if( $state.current.name.indexOf('view')!=-1 ) {
            //   $state.go('^.list');
            // }

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

    AreasService.upsertArea($scope.area, orgId, function(area) {
      var areaExists = false;

      for(var i=0; i<$scope.organization.areas.length; i++) {
        if($scope.organization.areas[i].id == area.id) {
          areaExists = true;
        }
      }

      if(!areaExists) {
        $scope.organization.areas.push(area);
      }

      $state.go('^.list');
    });
  };

  var loadItems = function() {
    AreasService.getAreas( $stateParams.organization, function(areas) {
      $scope.areas = areas;
    });
  }

  loadItems();

  if ($stateParams.id) {
    $scope.area = AreasService.getArea($stateParams.id);
  } else {
    $scope.area = {};
  }

});
