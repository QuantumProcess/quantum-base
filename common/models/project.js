module.exports = function(Project) {

  Project.observe('before delete', function (ctx, next) {

    var Task = ctx.Model.app.models.Task;
    Task.find({
      where: {
        projectId: ctx.where.id
      }
    }, function (err, tasks) {
      tasks.forEach(function (task) {
        Task.destroyById(task.id);
      });
    });
    next();
  });
};
