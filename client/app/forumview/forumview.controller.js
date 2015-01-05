'use strict';

angular.module('synergyApp')
  .controller('ForumviewCtrl', ['$scope', '$http', '$stateParams', 'streamForums', function ($scope, $http, $stateParams, streamForums) {

    $scope.boards  = [];

    /**
     *  Grabs thread based on post id or thread id.
     */
    $http.get('/api/boards/forum/showthread?fid='+$stateParams.fid+'&tid=' + $stateParams.tid + '&pid=' + $stateParams.pid).success(function(b) {
      streamForums.showThread($scope.boards || ($scope.boards = []), b);
    });

  }]);
