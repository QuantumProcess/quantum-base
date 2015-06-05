'use strict';

// to enable these logs set `DEBUG=boot:03-load-content` or `DEBUG=boot:*`
var log = require('debug')('boot:03-load-content');

module.exports = function(app) {

  if (app.dataSources.db.name !== 'Memory' && !process.env.INITDB) {
    return;
  }

  var Organization = app.models.Organization;
  var Area = app.models.Area;
  var Project = app.models.Project;
  var Task = app.models.Task;

  var orgMember = app.models.orgMember;
  var user = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  // var Member = app.models.Member;

  var Qgroup = app.models.Qgroup;

  Organization.findOrCreate(
    {where:{name: 'Quantum'}}, // find
    {
      name: 'Quantum',
      lema: 'Into the future',
      info: 'We are a young and agile entrepeneur team, growing fast, looking forward to success.'
    }, // create
    function(err, organization, created) {
      if (err) {
        log('err', err);
      }
      (created) ? log('created Organization', organization.name)
                : log('found Organization', organization.name);

      Area.findOrCreate(
        {where:{name: 'Marketing'}}, // find
        {
          name: 'Marketing',
          description: 'Producción de ideas y Promociones',
          organizationId: organization.id
        }, // create
        function(err, area, created) {
          if (err) {
            log('err', err);
          }
          (created) ? log('created Area', area.name)
                    : log('found Area', area.name);
          Project.findOrCreate(
            {where:{name: 'Quantum Showcase'}}, // find
            {
              name: 'Quantum Showcase',
              description: 'Creando nichos para Quantum',
              info: 'Investiguemos y/o creemos casos de uso en donde Quantum pueda ser aplicado. Luego armemos Presentaciones para mostrarlo como solución en cada uno.',
              areaId: area.id
            }, // create
            function(err, project, created) {
              if (err) {
                log('err', err);
              }
              (created) ? log('created Project', project.name)
                        : log('found Project', project.name);
              Task.findOrCreate(
                {where:{title: 'Definir Quantum'}}, // find
                {
                  title: 'Definir Quantum',
                  description: 'Escribir 3 párrafos diferentes que definan las funcionalidades del sistema.',
                  projectId: project.id
                }, // create
                function(err, task, created) {
                  if (err) {
                    log('err', err);
                  }
                  (created) ? log('created Task', task.name)
                            : log('found Task', task.name);
                });
              Task.findOrCreate(
                {where:{title: 'Logo Quantum'}}, // find
                {
                  title: 'Logo Quantum',
                  description: 'Diseñar bocetos para el logo de Quantum.',
                  projectId: project.id
                }, // create
                function(err, task, created) {
                  if (err) {
                    log('err', err);
                  }
                  (created) ? log('created Task', task.name)
                            : log('found Task', task.name);
                });
            });
        });
      Area.findOrCreate(
        {where:{name: 'Sales'}}, // find
        {
          name: 'Sales',
          description: 'Departamento de ventas',
          organizationId: organization.id
        }, // create
        function(err, area, created) {
          if (err) {
            log('err', err);
          }
          (created) ? log('created Area', area.name)
                    : log('found Area', area.name);
          Project.findOrCreate(
            {where:{name: 'Contactos'}}, // find
            {
              name: 'Contactos',
              description: 'Agenda de contactos comerciales',
              info: 'Ubiquemos posibles futuros clientes de Quantum y tratemos de definir el alcance del producto.',
              areaId: area.id
            }, // create
            function(err, project, created) {
              if (err) {
                log('err', err);
              }
              (created) ? log('created Project', project.name)
                        : log('found Project', project.name);
              Task.findOrCreate(
                {where:{title: 'Copiar Clientes'}}, // find
                {
                  title: 'Copiar Clientes',
                  description: 'Listar los clientes de compañías que ofrecen un producto similar.',
                  projectId: project.id
                }, // create
                function(err, task, created) {
                  if (err) {
                    log('err', err);
                  }
                  (created) ? log('created Task', task.name)
                            : log('found Task', task.name);
                });
            });
        });
      Area.findOrCreate(
        {where:{name: 'Development'}}, // find
        {
          name: 'Development',
          description: 'Desarrollo de Software',
          organizationId: organization.id
        }, // create
        function(err, area, created) {
          if (err) {
            log('err', err);
          }
          (created) ? log('created Area', area.name)
                    : log('found Area', area.name);
          Project.findOrCreate(
            {where:{name: 'Quantum Core'}}, // find
            {
              name: 'Quantum Core',
              description: 'Desarrollando motor de Quantum',
              info: 'Una base de sistema de Gestión y Seguimiento de procesos.',
              areaId: area.id
            }, // create
            function(err, project, created) {
              if (err) {
                log('err', err);
              }
              (created) ? log('created Project', project.name)
                        : log('found Project', project.name);
              Task.findOrCreate(
                {where:{title: 'Modelos'}}, // find
                {
                  title: 'Modelos',
                  description: 'Establecer todos los modelos con sus posibles relaciones.',
                  projectId: project.id
                }, // create
                function(err, task, created) {
                  if (err) {
                    log('err', err);
                  }
                  (created) ? log('created Task', task.name)
                            : log('found Task', task.name);
                });
              Task.findOrCreate(
                {where:{title: 'MongoDB'}}, // find
                {
                  title: 'MongoDB',
                  description: 'Configurar MongoDB connector.',
                  projectId: project.id
                }, // create
                function(err, task, created) {
                  if (err) {
                    log('err', err);
                  }
                  (created) ? log('created Task', task.name)
                            : log('found Task', task.name);
                });
              Task.findOrCreate(
                {where:{title: 'Admin Panel'}}, // find
                {
                  title: 'Admin Panel',
                  description: 'Construír website para administrar los modelos.',
                  projectId: project.id
                }, // create
                function(err, task, created) {
                  if (err) {
                    log('err', err);
                  }
                  (created) ? log('created Task', task.name)
                            : log('found Task', task.name);
                });
            });
        });

        Qgroup.findOrCreate(
          {where:{name: 'Founders'}}, // find
          {
            name: 'Founders',
            description: 'Grupo humano inicial',
            organizationId: organization.id
          }, // create
          function(err, group, created) {
            if (err) {
              log('err', err);
            }
            (created) ? log('created Group', group.name)
                      : log('found Group', group.name);
          });

        Project.findOrCreate(
          {where:{name: 'Organizarnos'}}, // find
          {
            name: 'Organizarnos',
            description: 'Mision y Vision de la Empresa',
            info: 'Definamos en pocas líneas quienes somos, que estamos queriendo hacer y con que objetivo específico, también nuestros roles.'
          }, // create
          function(err, project, created) {
            if (err) {
              log('err', err);
            }
            (created) ? log('created Project', project.name)
                      : log('found Project', project.name);
            Task.findOrCreate(
              {where:{title: 'Escribir Mision'}}, // find
              {
                title: 'Escribir Misión',
                description: '¿Porqué queremos hacer lo que estamos haciendo?',
                projectId: project.id
              }, // create
              function(err, task, created) {
                if (err) {
                  log('err', err);
                }
                (created) ? log('created Task', task.name)
                          : log('found Task', task.name);
              });
            Task.findOrCreate(
              {where:{title: 'Escribir Visión'}}, // find
              {
                title: 'Escribir Visión',
                description: '¿A donde queremos llegar y que queremos lograr con todo esto?',
                projectId: project.id
              }, // create
              function(err, task, created) {
                if (err) {
                  log('err', err);
                }
                (created) ? log('created Task', task.name)
                          : log('found Task', task.name);
              });
          });
    });

    Organization.findOrCreate(
     {where:{name: 'Test1'}}, // find
     {
       name: 'Test 1',
       lema: 'blabla',
       info: 'nada...'
     }, // create
     function(err, organization, created) {
       if (err) {
         log('err', err);
       }
       (created) ? log('created Organization', organization.name)
                 : log('found Organization', organization.name);
    });


};
