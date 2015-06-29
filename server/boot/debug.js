module.exports = function(app) {
  var TestUser = app.loopback.getModel('user');
  console.log(TestUser.settings.acls);
};
