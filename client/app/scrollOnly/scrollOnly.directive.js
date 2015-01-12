'use strict';

angular.module('synergyApp')
  .directive('scrollOnly', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        // var el = $(element)
        var height = element.height();
        var scrollHeight = element.get(0).scrollHeight;
        element.bind('click', function(e) {
          console.log(scrollHeight);
        })
        element.bind('mousewheel', function(e, d) {
          console.log(d);
          if ((this.scrollTop === (scrollHeight - height) && d < 0) || (this.scrollTop === 0 && d > 0)) {
            e.preventDefault();
          }
        });
      }
    };
  });
