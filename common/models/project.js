module.exports = function(Project) {

  Project.observe('before delete', function (ctx, next) {

    var Event = ctx.Model.app.models.Event;
    Event.find({
      where: {
        projectId: ctx.where.id
      }
    }, function (err, events) {
      events.forEach(function (event) {
        Event.destroyById(event.id);
      });
    });

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
