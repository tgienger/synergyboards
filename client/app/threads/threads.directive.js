'use strict';

angular.module('synergyApp')
  .directive('threads', function ($http, streamForums) {
    return {
      templateUrl: 'app/threads/threads.html',
      restrict: 'EA',
      // scope: {forums: '=', fid: '=', forumShown: '='},
      link: function (scope, element, attrs) {
      },
      controller: function($scope) {
        // $(function() {
        //
        //   var toolbox = $('.thread_container'),
        //   height = toolbox.height(),
        //   scrollHeight = toolbox.get(0).scrollHeight;
        //
        //   toolbox.bind('mousewheel', function(e, d) {
        //     if((this.scrollTop === (scrollHeight - height) && d < 0) || (this.scrollTop === 0 && d > 0)) {
        //       e.preventDefault();
        //     }
        //   });
        //
        // });
      }
    };
  });
