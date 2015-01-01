'use strict';

angular.module('synergyApp')
  .controller('MainCtrl', ['$scope', '$http', 'streamForums', function ($scope, $http, streamForums) {
    $scope.awesomeThings = [];
    $scope.boards = [];
    var threads = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $http.get('/api/boards').success(function(b) {
      streamForums.showForums($scope.boards || ($scope.boards = []), b);
      console.log($scope.boards);
    });

    $scope.threads = threads;

  }]);
