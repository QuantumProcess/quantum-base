'use strict';

module.exports = function(user) {

  user.observe('after save', function checkOrg(ctx, next) {

    var orgMember = ctx.Model.app.models.orgMember;

    if(ctx.instance) {
      var user = ctx.instance;
      console.log("mira:",user.organizationId);
      if(user.organizationId !== undefined && user.organizationId != 0) {
        console.log("y entre");

        orgMember.create(
          {
            userId: user.id,
            organizationId: user.organizationId,
            position: 'completar'
          },
          function(err, relation) {
            console.log("y cree",relation);
            if (err) {
              console.log('err', err);
            }
          });

        // Organization.findById( user.organizationId , function(err,org) {
        //   console.log('Tengo org',org);
        //   if(!err) {
        //     console.log('entre aca');
        //     user.organizations.add(org, function(err, member) {
        //        console.log('created member para org', member);
        //     });
        //     console.log('me jui');
        //   }
        //   user.organizationId=undefined;
        //   console.log('me jui 2',user.organizationId);
        // });

      }
    }
    next();
  });


  user.observe('before save', function checkOrg(ctx, next) {
    if(ctx.instance) {
      var user = ctx.instance;

      if (user.username == undefined) {
        user.username = user.email;
      }
      user.status = 'created';
      user.created = Date.now();
    } else {
    }
    next();
  });

};
