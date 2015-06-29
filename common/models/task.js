module.exports = function(Task) {

  Task.observe('before delete', function (ctx, next) {

    var Subtask = ctx.Model.app.models.Subtask;
    Subtask.find({
      where: {
        taskId: ctx.where.id
      }
    }, function (err, subtasks) {
      subtasks.forEach(function (subtask) {
        Subtask.destroyById(subtask.id);
      });
    });
    next();
  });
};
