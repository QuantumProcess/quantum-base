# Quantum

  Proyecto base para Quantum

## Features a esta versión

- User ACL y Autenticación con dos usuarios por defecto (admin@quantum.com[pass:admin] y user@quantum.com[pass:user])
- REST API para todos los modelos creados con sus relaciones
- AngularJS y UI-Router
- Cliente responsive con:
  - angular-formly
  - angular-toasty
  - Translates

## Por hacer para la siguiente versión:

- Implementar MongoDB
- Definir relaciones entre los modelos
- Aplicar permisos por Roles para las acciones de los usuarios autenticados.

## Para instalar:

    npm install

## Correr el server:

    npm run dev ( lo ves en: http://localhost:3000/explorer )

## Correr el cliente:

  grunt serve ( lo ves en: http://localhost:9000/ )

## Importante:
  
  La primera vez que se ejecuta puede pasar que el cliente no levante. Esto
  sucede porque no alcanzó a leer el lb-services.js recién generado.

  En caso de que esto pase, matar el grunt serve y correrlo de nuevo,
  tiene que andar.
