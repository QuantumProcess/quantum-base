module.exports = function(Area) {

  Area.observe('before delete', function (ctx, next) {

    var Project = ctx.Model.app.models.Project;
    Project.find({
      where: {
        areaId: ctx.where.id
      }
    }, function (err, projects) {
      projects.forEach(function (project) {
        Project.destroyById(project.id);
      });
    });
    next();
  });
};
