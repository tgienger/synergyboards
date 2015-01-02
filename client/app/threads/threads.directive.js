'use strict';

angular.module('synergyApp')
  .directive('threads', function () {
    return {
      templateUrl: 'app/threads/threads.html',
      restrict: 'EA',
      scope: {boards: '='},
      link: function (scope, element, attrs) {

      }
    };
  });
