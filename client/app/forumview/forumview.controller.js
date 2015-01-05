'use strict';

angular.module('synergyApp')
  .controller('ForumviewCtrl', ['$scope', '$http', '$stateParams', 'streamForums', function ($scope, $http, $stateParams, streamForums) {

    $scope.boards  = [];
    // $scope.status.status = $sce.trustAsHtml($scope.status.status);

    /**
     *  Grabs
     */
    $http.get('/api/boards/forum/showthread?fid='+$stateParams.fid+'&tid=' + $stateParams.tid + '&pid=' + $stateParams.pid).success(function(b) {
      streamForums.showThread($scope.boards || ($scope.boards = []), b);
    });


    /**
     * turns all textarea's into sceditors
     */
    $(function() {
        // Replace all textarea's
        // with SCEditor
        $("textarea").sceditor({
            plugins: "bbcode",
            style: "minified/jquery.sceditor.default.min.css"
        });
    });

  }]);
