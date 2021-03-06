'use strict';

angular.module('synergyApp')
  .directive('snapTo', function ($parse) {
    return {
      restrict: 'A',
      scope: {elPos: '=', toggle: '='},
      link: function (scope, element, attrs) {

        var bounceBack = false;
      	var toggle = false;
      	scope.$watch('toggle.show', function (d) {
      		toggle = d;
      	})


      	/**
      	 * scrolls clicked div to top of page
      	 * @param  {number} y y position of clicked element
      	 * @param  {number} d duration of scroll animation
      	 */
      	function scrollTo(y, d, cb) {
      		$('html, body').stop().animate({scrollTop: y}, d, (cb || angular.noop))
      	}

          	// global stores current "top" position
    		var lastScrollTop = 0;

    		// global storing current moving direction
    		var scrollDirection = '';

    		// duration of snap animation
    		var snapDuration = 100;

    		// distance above and below the element to still
    		// activate the animation
    		var scrollDistance = 300;

    		// the duration for the initial "click" animation
    		var initScrollDur = 100;

    		// amount of time waited after scrolling has stopped
    		// - going too small causes jittering, 100 seems to
    		//   work well.
    		var scrollStopTimeout = 100;


		/**
		 * Binds this element to 'click'
		 * @param  {event} e)
		 */
      	element.bind('click', function(e) {

      		scope.elPos = element.offset().top;
      		scope.$apply();


      		// Scroll the current div to top of page.
      		scrollTo(scope.elPos, initScrollDur);

          /**
           * Snap to current element
           */
      		$(window).bind('mousewheel', function(e, d) {
      			var winTop = $(window).scrollTop();
	      		var docHeight = $(document).height();
	      		var winHeight = $(window).height();

	      		if (d > 0) {
	      			scrollDirection = 'up';
	      		} else {
	      			scrollDirection = 'down';
	      		}

      			clearTimeout($.data(this, 'scrollTimer'));
      			if (toggle && bounceBack) {
	      			$.data(this, 'scrollTimer', setTimeout(function() {
	      				if (scope.elPos - winTop < -scrollDistance || scope.elPos - winTop > scrollDistance) {
		      				clearTimeout($.data(this, 'scrollTimer'))
		      			} else {
		      				scrollTo(scope.elPos, snapDuration)
		      			}
	      			}, scrollStopTimeout));
      			}

	      		lastScrollTop = winTop;
      		});
      	});
      }
    };
  });
