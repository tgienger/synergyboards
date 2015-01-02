'use strict';

angular.module('synergyApp')
  .controller('ForumviewCtrl', ['$scope', '$http', '$stateParams', 'streamForums', function ($scope, $http, $stateParams, streamForums) {

    $scope.boards  = [];
    // $scope.status.status = $sce.trustAsHtml($scope.status.status);

    $http.get('/api/boards/posts/' + $stateParams.id).success(function(b) {
      streamForums.showThread($scope.boards || ($scope.boards = []), b);
    });



    $(function() {
        // Replace all textarea's
        // with SCEditor
        $("textarea").sceditor({
            plugins: "bbcode",
            style: "minified/jquery.sceditor.default.min.css"
        });
    });

  }]);
