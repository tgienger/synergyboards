(function () {

    'use strict';

    angular.module('synergyApp')
      .directive('snapTo', function ($parse, $window) {
        return {
          restrict: 'A',
          link: function (scope, element, attrs) {

            var bounceBack = attrs.bounceBack,
                offset = attrs.offset,
                el = element;
            scope.toggleOff = false;


            /**
             * scrolls clicked div to top of page
             * @param  {number} y y position of clicked element
             * @param  {number} d duration of scroll animation
             * @param {callback} optional callback
             */
          	function scrollTo(y, d, cb) {
          		$('html, body').stop().animate({scrollTop: y}, d, (cb || angular.noop))
                // element.css({'position':'fixed', 'top':'50px','z-index':'100'})
          	}

          	// global stores current "top" position
    		var lastScrollTop = 0,
        		scrollDirection = '',  // global storing current moving direction
        		snapDuration = 100,  // duration of snap animation
        		scrollDistance = 300,  // distance to stop bounce back
        		initScrollDur = 100,  // the duration for the initial "click" animation
        		scrollStopTimeout = 100, // check for scrolling to stop
                el = angular.element;


            el(window).bind('mousewheel', function (e, d) {
                var _window = angular.element($window),
                    winTop = _window.scrollTop(),
                    elPos = element.offset().top,
                    elementHeight = sx.elHeight(element),
                    delta = d;

                // console.log(_window.scrollTop())
                if (winTop < elementHeight) {
                    el('.breadcrumb').css({opacity: 1 - winTop/100*2})
                }

            });


    		/**
    		 * Binds this element to 'click'
    		 * @param  {event} e)
    		 */
          	element.bind('dblclick', function(e) {

          		var elPos = element.offset().top - offset;


          		// Scroll the current div to top of page.
          		scrollTo(elPos, initScrollDur);

              /**
               * Snap to current element
               */
          		el($window).bind('mousewheel', function(e, d) {
          			var winTop = $(window).scrollTop();
    	      		var docHeight = el(document).height();
    	      		var winHeight = el(window).height();
    	      		if (d > 0) {
    	      			scrollDirection = 'up';
    	      		} else {
    	      			scrollDirection = 'down';
    	      		}

          			clearTimeout($.data(this, 'scrollTimer'));
          			if (bounceBack) {
    	      			$.data(this, 'scrollTimer', setTimeout(function() {
    	      				if (elPos - winTop < -scrollDistance || elPos - winTop > scrollDistance) {
    		      				clearTimeout($.data(this, 'scrollTimer'))
    		      			} else {
    		      				scrollTo(elPos, snapDuration)
    		      			}
    	      			}, scrollStopTimeout));
          			}

    	      		lastScrollTop = winTop;
          		});
          	});
          }
        };
      });
}());
