'use strict';

angular.module('synergyApp')
  .controller('ThreadViewCtrl', function ($scope, $http, streamForums) {
  	$http.get('/api/boards').success(function(b) {
  		$scope.boards = $scope.boards || [];

      streamForums.showForums($scope.boards || ($scope.boards = []), b);
      console.log($scope.boards)
    });
  });
