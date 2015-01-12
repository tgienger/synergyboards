'use strict';

angular.module('synergyApp')
  .directive('forums', function ($http) {
    return {
      templateUrl: 'app/forums/forums.html',
      restrict: 'EA',
      scope: {boards: '='},
      link: function (scope, element, attrs) {
      	var openForums = [];
      	var closeAllOpen = true;
      	var scrollDirection;
      	var scrollBuffer = -20;
      	var animationTimer = 100;

      	function closeAll() {
      		angular.forEach(openForums, function(o) {
      			o.toggle.show = false;
      		});
      	}

      	var keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];

      	function preventDefault(e) {
      		e = e || window.event;
      		if (e.preventDefault)
      			e.preventDefault();
      		e.returnValue = false;
      	}

      	function wheel(e) {
      		preventDefault(e);
      	}

      	function keydown(e) {
      		// preventDefault(e);
      		// console.log(e);
      		for (var i = keys.length; i--;) {
      			if (e.keyCode === keys[i]) {
      				preventDefault(e);
      				return;
      			}
      		}
      	}

      	function disableScrolling() {
      		document.onkeydown = keydown;
      	}

      	function enableScrolling() {
      		if (window.removeEventListener) {
      			window.removeEventListener('DOMMouseScroll', wheel, false);
      		}
      		document.onkeydown = null;
      	}

      	/**
      	 * gets current selected forums contents and displays it
      	 * @param  {object} sub the currenlty selcted sub forum
      	 * @return {none}
      	 */
      	scope.showForum = function(sub, e) {

	      	var lastScrollTop = 0;

      		// grabbing child scope
      		var cs = this;
      		cs.elPos;
      		cs.toggle = cs.toggle || {show: false};
      		cs.current_rating = cs.totalratings / cs.numratings || 0;

      		// show / hide the current forums contents
      		if (!cs.toggle.show) {
      			if (closeAllOpen) {
	      			closeAll(openForums);
      			}

      			// go grab the list of sub forums for this category
	      		$http.get('/api/boards/forum/showforum/' + sub.fid).success(function (b) {
					cs.forums = b;
	      			if (openForums.indexOf(cs) < 0)
		      			openForums.push(cs);

	      			cs.toggle.show = true;
              disableScrolling();
	      			// assign scroll even to close if scrolled too far
	      			$(window).bind('mousewheel', function(e) {
	      				if (e.which > 0 || e.type == 'mousedown' || e.type == 'mousewheel' || e.type == 'touchstart') {
		      				var winTop = $(window).scrollTop();
				      		var docHeight = $(document).height();
				      		var winHeight = $(window).height();

				      		if (lastScrollTop >= winTop) {
				      			scrollDirection = 'up';
				      		} else {
				      			scrollDirection = 'down';
				      		}

			      			if (cs.elPos - winTop < - 300 || cs.elPos - winTop > 300) {
			      			if (cs.toggle.show === true) {
			      				cs.toggle.show = false;
                    enableScrolling();
			      				scope.$apply();
			      				if (scrollDirection === 'down') {
						      		$('html, body').stop().animate({scrollTop: cs.elPos-scrollBuffer}, animationTimer, function() {
                        // create overscroll divs
						      		});
			      				} else {

			      				}

			      			}
		      			}

		      			lastScrollTop = winTop;
		      		}

            });

				});

      		} else {
      			cs.toggle.show = false;
            enableScrolling();
      		}
      	}

      },
      controller: function($scope) {
        $('.scrollable').on('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchstart', function(e) {
          e.stopPropagation();
        })
      }
    };
  });
