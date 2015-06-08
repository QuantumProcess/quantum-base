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

};
