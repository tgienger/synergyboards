'use strict';

angular.module('synergyApp')
  .directive('threads', function ($http, streamForums) {
    return {
      templateUrl: 'app/threads/threads.html',
      restrict: 'EA',
      // scope: {forums: '=', fid: '=', forumShown: '='},
      link: function (scope, element, attrs) {

      },
    };
  });
