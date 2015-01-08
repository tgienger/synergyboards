'use strict';

angular.module('synergyApp')
  .directive('forums', function ($http) {
    return {
      templateUrl: 'app/forums/forums.html',
      restrict: 'EA',
      scope: {boards: '='},
      link: function (scope, element, attrs) {
      	// scope.forums = [];
      	var openForums = [];

      	/**
      	 * gets current selected forums contents and displays it
      	 * @param  {object} sub the currenlty selcted sub forum
      	 * @return {none}
      	 */
      	scope.showForum = function(sub) {
      		// grabbing child scope
      		var cs = this;
      		cs.toggle = cs.toggle || {show: false}

      		// show / hide the current forums contents
      		if (!cs.toggle.show) {
      			angular.forEach(openForums, function(d) {
      				d.toggle.show = false;
      			})

      			var cs = this;
	      		$http.get('/api/boards/forum/showforum/' + sub.fid).success(function (b) {
					cs.forums = b;
	      			cs.toggle.show = true;
	      			if (openForums.indexOf(cs) < 0)
		      			openForums.push(cs);
				});
      		} else {
      			cs.toggle.show = false;
      		}
      	}
      },
      controller: function($scope) {
      	// console.log($scope.boards)
      }
    };
  });