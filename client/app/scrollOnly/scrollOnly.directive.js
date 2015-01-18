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

        scope.$watch('composer.collapse', function() {
          if(scope.composer.collapse) {
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
