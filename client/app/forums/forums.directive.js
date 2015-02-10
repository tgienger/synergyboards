'use strict';

angular.module('synergyApp')
  .directive('forums', function ($http) {
    return {
      templateUrl: 'app/forums/forums.html',
      restrict: 'EA',
      scope: {boards: '='},
      link: function (scope, element, attrs) {
          scope.test = function() {
              console.log('test working');
          };
      },
    };
  });
