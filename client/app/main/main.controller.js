'use strict';

angular.module('synergyApp')
  .controller('MainCtrl', ['$scope', '$http', 'streamForums', function ($scope, $http, streamForums) {
    $scope.boards = [];
    var threads = [];

    $scope.getThreads = function(fid) {
      $http.get('/api/boards/forum/showforum/' + fid).success(function(b) {
        $scope.forums = b;
      });
    }

    $http.get('/api/boards').success(function(b) {
      streamForums.showForums($scope.boards || ($scope.boards = []), b);
    });

    $scope.threads = threads;

  }]);
