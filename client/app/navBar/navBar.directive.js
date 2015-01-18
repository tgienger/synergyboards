'use strict';

angular.module('synergyApp')
  .directive('navBar', function () {
    return {
      templateUrl: 'app/navBar/navBar.html',
      restrict: 'E',
      scope: {},
      link: function (scope, element, attrs) {

      },
    };
  });
