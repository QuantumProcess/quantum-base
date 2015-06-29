'use strict';
angular.module('com.module.events')
  .run(function($stateParams, $rootScope, Event, gettextCatalog) {

    $rootScope.addMenu(gettextCatalog.getString('Events'), 'app.events.list',
      'fa-calendar-o', ['user']);

    Event.find(function(data) {
      $rootScope.addDashboardBox('Events', 'bg-red', 'ion-calendar',
        data.length, 'app.events.list', ['user']);
    });
});
