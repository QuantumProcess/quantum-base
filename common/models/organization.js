'use strict';

var log = require('debug')('hook:organization.js');

module.exports = function(Organization) {

  Organization.observe('before delete', function (ctx, next) {

    var Area = ctx.Model.app.models.Area;
    Area.find({
      where: {
        organizationId: ctx.where.id
      }
    }, function (err, areas) {
      areas.forEach(function (area) {
        Area.destroyById(area.id);
      });
    });
    next();
  });

  Organization.observe('after save', function (ctx, next) {

    var Area = ctx.Model.app.models.Area;

    Area.find({
      where: {
        name: 'General'
      }
    }, function (err, areas) {
      if(!areas.length) {

        Area.create ({
          name: 'General',
          description: 'Organization projects',
          organizationId: ctx.instance.id
        }, function(err, area) {
          if (err) {
            log('err', err);
          } else {
            log('info', area);
          }
        });
      }
      next();
    });
  });
};
