module.exports = function(user) {

  user.observe('beforeSave', function settingUser(ctx, next) {

    if(ctx.instance) {

      var user = ctx.instance;

      if (user.username == undefined) {
        user.username = user.email;
      }
      user.status = 'created';
      user.created = Date.now();
    }
    next();
  });
};
