'use strict';

angular.module('synergyApp')
  .controller('ForumviewCtrl', ['$scope', '$http', '$stateParams', 'streamForums', function ($scope, $http, $stateParams, streamForums) {

    $scope.boards  = [];

    $http.get('/api/boards/posts/' + $stateParams.id).success(function(b) {
      streamForums.showThread($scope.boards || ($scope.boards = []), b);
      console.log($scope.boards);
    });

  }]);
