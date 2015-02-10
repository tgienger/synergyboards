'use strict';

angular.module('synergyApp')
  .controller('ForumviewCtrl', ['$scope', '$http', '$stateParams', 'streamForums', function ($scope, $http, $stateParams, streamForums) {

    $scope.forums  = [];

    /**
     *  Grabs thread based on post id or thread id.
     */

    $http.get('/api/boards/forum/'+$stateParams.id).success(function(b) {
        streamForums.showThread($scope.forums, b);
        $scope.breadcrumbs = [
            {name: 'Home', url: 'main'},
            {name: $scope.forums[0].parent, url: null}
        ];
    });

    $scope.compose = function() {
      var p = {
        subject: ''
      };
      $scope.synergyComposer.submit(p);
    };

    $scope.submit = function() {
        console.log('posting to database');
    };

}]);
