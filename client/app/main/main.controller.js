'use strict';

angular.module('synergyApp')
  .controller('MainCtrl', ['$scope', '$http', 'streamForums', function ($scope, $http, streamForums) {
    $scope.boards = [];
    var threads = [];


    $(function() {
        // Replace all textarea's
        // with SCEditor
        $("textarea").sceditor({
            plugins: "bbcode",
            style: "minified/jquery.sceditor.default.min.css"
        });
    });

    $scope.getThreads = function(fid) {
      $http.get('/api/boards/forum/showforum/' + fid).success(function(b) {
        $scope.forums = b;
      });
    }

    $http.get('/api/boards').success(function(b) {
      streamForums.showForums($scope.boards || ($scope.boards = []), b);
      // console.log($scope.boards)
    });

    $scope.threads = threads;

  }]);
