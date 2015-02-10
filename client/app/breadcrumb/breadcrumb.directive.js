'use strict';

angular.module('synergyApp')
  .directive('breadcrumb', function () {
    return {
      templateUrl: 'app/breadcrumb/breadcrumb.directive.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
