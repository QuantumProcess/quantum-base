'use strict';
var app = angular.module('com.module.areas');

app.service('AreasService', ['$state', 'CoreService', 'Area', 'Organization',
  'gettextCatalog', function($state, CoreService, Area, Organization, gettextCatalog) {

  this.getAreas = function( orgId, callback ) {

    if(orgId===undefined) {

      callback(Area.find());
    }
    else {
      Organization.findById({
        id:orgId,
        filter:{ include:'areas' }
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

  this.getArea = function(id) {
    return Area.findById({
      id: id,
      filter:{ include: ['projects','events'] }
    });
  };

  this.upsertArea = function(area, orgId, cb) {

    if(orgId!=='') {
        area.organizationId = orgId;
    }

    Area.upsert(area, function(object) {
      CoreService.toastSuccess(gettextCatalog.getString(
        'Area saved'), gettextCatalog.getString(
        'Your area is safe with us!'));

      cb(object.toJSON());
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
