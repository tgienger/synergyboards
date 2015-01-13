'use strict';

angular.module('synergyApp')
  .directive('scrollOnly', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {

        // Get the total height of the element to be scrolled
        var height = element.height();
        // Get the scroll height of the element
        var scrollHeight = element.get(0).scrollHeight;
        element.bind('click', function() {
            console.log('height: ' + height)
            console.log('scroll: ' + scrollHeight)
        })

        scope.$watch('toggle.show', function() {
          if(scope.toggle.show) {
            element.bind('mousewheel', function(e, d) {
                console.log(d)
                if ((this.scrollTop === (scrollHeight - height) && d < 0) || (this.scrollTop === 0 && d > 0)) {
                    e.preventDefault();
                }
            });
          } else {
              element.unbind('mousewheel');
          }
        })

      }
    };
  });
