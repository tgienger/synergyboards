(function () {
    'use strict';

    angular.module('synergyApp')
      .directive('resizeable', function () {
          // private variables
          var minHeight = 150;
          var viewport = document.documentElement.clientHeight;

        return {
            // public
            restrict: 'A',
            link: function (scope, element, attrs) {

                var currentElement = angular.element(element[0].parentElement),
                    maxHeight = viewport - currentElement.height(),
                    startHeight = currentElement.height();


                angular.element(window).on('resize orientationChanged', function() {
                    viewport = document.documentElement.clientHeight;
                    var height = currentElement.height();
                    if (height > viewport) {
                        currentElement.height(viewport)
                    }
                });

                function mouseMove(event) {
                    event.preventDefault();
                    var pageY = event.type === 'touchmove' ? event.originalEvent.touches[0].pageY : event.pageY;
                    var newHeight = currentElement.startHeight - (pageY - currentElement.startY);

                    if (newHeight < minHeight || viewport - newHeight < 3){
                        return;
                    }
                    currentElement.height(newHeight);
                }
                function mouseUp() {
                    angular.element(document).off('mouseup touchend', mouseUp);
                    angular.element(document).off('mousemove touchmove', mouseMove);
                }

                element.bind('mousedown touchstart', function(event) {
                    event.preventDefault();
                    currentElement.startHeight = currentElement.height();
                    currentElement.startY = event.type === 'touchstart' ? event.originalEvent.touches[0].pageY : event.pageY;

                    angular.element(document).on('mouseup touchend', mouseUp);
                    angular.element(document).on('mousemove touchmove', mouseMove);
                });

                function expandToggle(event, cb) {
                    event.preventDefault();
                    var height = currentElement.height();
                    if (height < startHeight) {
                        currentElement.height(startHeight);
                    } else if (height < viewport) {
                        currentElement.height(viewport);
                    } else {
                        currentElement.height(startHeight);
                    }
                }

                element.bind('dblclick', expandToggle);


            }
        };
      });
}());
