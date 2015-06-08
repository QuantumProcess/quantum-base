'use strict';

// to enable these logs set `DEBUG=boot:03-load-content` or `DEBUG=boot:*`
var log = require('debug')('boot:04-relate-models');

module.exports = function(app) {

  if (app.dataSources.db.name !== 'Memory' && !process.env.INITDB) {
    return;
  }

  var Organization = app.models.Organization;
  var User = app.models.user;

  setTimeout( function() {

    User.findById( 2 , function(err,user) {
      if(!err) {
        log('user',user);

        Organization.findById( 1 , function(err,org) {
          log('org',org);
          if(!err) {
            user.organizations.add(org, function(err, member) {
               log('created member para org', member);
            });
          }
        });

        Organization.findById( 2 , function(err,org) {
          log('org',org);
          if(!err) {
            user.organizations.add(org, function(err, member) {
               log('created member para org', member);
            });
          }
        });
      }
    });

  }, 3000 );

};
