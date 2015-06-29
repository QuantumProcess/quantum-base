'use strict';

/**
 * @ngdoc directive
 * @name com.module.core.directive:adminHeader
 * @description
 * @param {string} title Title
 * @param {string} subTitle Subtitle
 * @param {string} description Description
 * # adminHeader
 */
angular.module('com.module.core')
  .directive('adminHeader', function($window) {
    return {
      templateUrl: 'modules/core/views/elements/admin-header.html',
      transclude: true,
      scope: {
        title: '@',
        subTitle: '@',
        description: '@'
      },
      restrict: 'A'
    };
  });
