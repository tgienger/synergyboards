'use strict';

angular.module('synergyApp')
  .directive('createPost', function () {
    return {
      templateUrl: 'app/createPost/createPost.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });