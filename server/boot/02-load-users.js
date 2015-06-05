'use strict';

// to enable these logs set `DEBUG=boot:02-load-users` or `DEBUG=boot:*`
var log = require('debug')('boot:02-load-users');

module.exports = function(app) {

  if (app.dataSources.db.name !== 'Memory' && !process.env.INITDB) {
    return;
  }

  createDefaultUsers();

  function createDefaultUsers() {

    var User = app.models.user;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;



    // var user1 = User.findOrCreate(
    //   {where: {username: 'user1'}}, // find
    //   {
    //     firstName: 'User1',
    //     lastName: '1',
    //     email: 'user1@quantum.com',
    //     username: 'user1',
    //     password: 'quantum'
    //   }, // create
    //   function(err, createdUser, created) {
    //     if (err) {
    //       log('error creating user', err);
    //     }
    //     (created) ? log('created user', createdUser.username)
    //               : log('found user', createdUser.username);
    //   });
    //
    // var user2 = User.findOrCreate(
    //   {where: {username: 'user2'}}, // find
    //   {
    //     firstName: 'User2',
    //     lastName: '2',
    //     email: 'user2@quantum.com',
    //     username: 'user2',
    //     password: 'quantum'
    //   }, // create
    //   function(err, createdUser, created) {
    //     if (err) {
    //       log('error creating user', err);
    //     }
    //     (created) ? log('created user', createdUser.username)
    //               : log('found user', createdUser.username);
    //   });
    //
    //   var user3 = User.findOrCreate(
    //     {where: {username: 'user3'}}, // find
    //     {
    //       firstName: 'User3',
    //       lastName: '3',
    //       email: 'user3@quantum.com',
    //       username: 'user3',
    //       password: 'quantum'
    //     }, // create
    //     function(err, createdUser, created) {
    //       if (err) {
    //         log('error creating user', err);
    //       }
    //       (created) ? log('created user', createdUser.username)
    //                 : log('found user', createdUser.username);
    //     });
    //
    //
    //     Role.create(
    //       { name: 'org_member' } ,
    //       function(err, role) {
    //         if (err) {
    //           log('error creando org_member Role', err);
    //         }
    //
    //         log('creando org_member Role', role.name);
    //
    //         User.findOrCreate(
    //           {where: {username: 'user1'}}, // find
    //           {
    //             firstName: 'User1',
    //             lastName: '1',
    //             email: 'user1@quantum.com',
    //             username: 'user1',
    //             password: 'quantum'
    //           }, // create
    //           function(err, createdUser, created) {
    //             if (err) {
    //               log('error creating roleUser', err);
    //             }
    //             (created) ? log('created user', createdUser.username)
    //                       : log('found user', createdUser.username);
    //
    //             role.principals.create({
    //               principalType: RoleMapping.USER,
    //               principalId: role.id
    //             }, function(err, rolePrincipal) {
    //               if (err) {
    //                 log('error creating rolePrincipal', err);
    //               }
    //               log('user1 es ahora org_member');
    //             });
    //           });
    //       });

        // Asigno role org_member al user1
        // Role.find(
        //   {where: {name: 'org_member'}},
        //   function(err, role, created) {
        //     if (err) {
        //       log('error running find role(org_member)', err);
        //     }
        //     log('found role', role.name, created, err);
        //
        //     role.principals.create({
        //       principalType: RoleMapping.USER,
        //       principalId: user2.id
        //     }, function(err, rolePrincipal) {
        //       if (err) {
        //         log('error creating rolePrincipal for user1', err);
        //       }
        //       log('created org_member role for user1');
        //     });
        // });

    var users = [];

    var roles = [{
      name: 'admin',
      users: [{
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@quantum.com',
        username: 'admin',
        password: 'admin'
      }]
    }, {
      name: 'org_member',
      users: [{
        firstName: 'User1',
        lastName: '1',
        email: 'user1@quantum.com',
        username: 'user1',
        password: 'quantum'
      },
      {
        firstName: 'User2',
        lastName: '2',
        email: 'user2@quantum.com',
        username: 'user2',
        password: 'quantum'
      },
      {
        firstName: 'User3',
        lastName: '3',
        email: 'user3@quantum.com',
        username: 'user3',
        password: 'quantum'
      }]
    }];

    roles.forEach(function(role) {
      Role.findOrCreate(
        {where: {name: role.name}}, // find
        {name: role.name}, // create
        function(err, createdRole, created) {
          if (err) {
            console.error('error running findOrCreate('+role.name+')', err);
          }
          (created) ? log('created role', createdRole.name)
                    : log('found role', createdRole.name);
          role.users.forEach(function(roleUser) {
            User.findOrCreate(
              {where: {username: roleUser.username}}, // find
              roleUser, // create
              function(err, createdUser, created) {
                if (err) {
                  console.error('error creating roleUser', err);
                }
                (created) ? log('created user', createdUser.username)
                          : log('found user', createdUser.username);
                createdRole.principals.create({
                  principalType: RoleMapping.USER,
                  principalId: createdUser.id
                }, function(err, rolePrincipal) {
                  if (err) {
                    console.error('error creating rolePrincipal', err);
                  }
                  users.push(createdUser);
                });
              });
          });
        });
    });

    return users;
  }

};
