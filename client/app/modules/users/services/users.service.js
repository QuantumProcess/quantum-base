'use strict';
var app = angular.module('com.module.users');

app.service('UsersService', ['$state', 'CoreService', 'User', 'Organization', 'OrgMember', 'gettextCatalog',
  function($state, CoreService, User, Organization, OrgMember, gettextCatalog) {

    this.getOrganizationUsers = function(organizationId, cb) {

      Organization.findById({
        id:organizationId,
        filter:{ include:{'members':['roles']} }
      },
        function(org) {
          cb(org.members);
        },
        function(errorResponse) {
          console.error('Error',errorResponse);
        }
      );
    }

    this.addToOrg = function(userId, orgId, cb) {
      OrgMember.find({
        filter:{ where:{ userId: userId, organizationId: orgId } }
      }, function(relation) {
        if(!relation.length) {
          // make org user
          OrgMember.create({
            userId: userId,
            organizationId: orgId
          }, function(relation) {
            cb();
          });
        }
      }, function(err) {
        console.log('Error finding relation: ', +err);
      });
    }

    this.removeFromOrg = function(userId, orgId, cb) {
      OrgMember.find({
        filter:{ where:{ userId: userId, organizationId: orgId } }
      })
      .$promise
      .then(function(relation) {
        OrgMember.deleteById({
          id: relation[0].id
        })
        .$promise
        .then(function() {
          console.log('deleted'); cb();
        });
      });
    }

    this.getSystemUsers = function(cb) {
      User.find({
        filter:{ include:['organizations','roles'] }
      }, function(users) {
        cb(users);
      });
    }

    this.upsertUser = function(user, cb) {
      User.upsert(user, function() {
        CoreService.toastSuccess(gettextCatalog.getString('User saved'),
          gettextCatalog.getString('This user is save!'));
        cb();
      }, function(err) {
        CoreService.toastError(gettextCatalog.getString(
          'Error saving user: ', +err));
      });
    };

    this.deleteUser = function(id, cb) {
      CoreService.confirm(gettextCatalog.getString('Are you sure?'),
        gettextCatalog.getString('Deleting this cannot be undone'),
        function() {
          User.deleteById(id, function() {
              CoreService.toastSuccess(gettextCatalog.getString(
                'User deleted'), gettextCatalog.getString(
                'Your user is deleted!'));
              cb();
            },
            function(err) {
              CoreService.toastError(gettextCatalog.getString(
                'Error deleting user'), gettextCatalog.getString(
                'Your user is not deleted:' + err));
            });
        },
        function() {
          return false;
        });
    };

}]);
