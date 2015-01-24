'use strict';

angular.module('synergyApp')
  .directive('phoneHidden', function ($window) {
    return function(scope, element) {
        var w = angular.element($window),
            elem = element[0];

        function windowSize() {
            return {
                h: w.height(),
                w: w.width()
            };
        };

        scope.$watch(windowSize, function(newSize, oldSize) {
            var height = newSize.h;
            var width = newSize.w;

            if (width < 768) {
                elem.style.display = 'none';
            } else {
                elem.style.display = 'block';
            }
        }, true);

        w.bind('resize', function() {
            scope.$apply();
        });
    }
  });
