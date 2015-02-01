'use strict';

angular.module('synergyApp')
    .controller('ForumviewCtrl', ['$scope', '$http', '$stateParams', 'streamForums', function ($scope, $http, $stateParams, streamForums) {

        $scope.forums  = [];
        //
        // var composer = {
        //     markdown: '',
        //     subject: '',
        //     topic: '',
        //     thread: {},
        //     submit: 'Topic',
        //     collapse: true
        // };
        //
        // $scope.synergyComposer = composer;

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

        $scope.compose = function(post) {
            // $scope.synergyComposer.submitName = 'Topic';
            // $scope.synergyComposer.collapse = false;
            // $scope.synergyComposer.topic = post.parent;
            $scope.synergyComposer.submit(post);
        };

        $scope.submit = function() {
            console.log('posting to database');
        };

}]);
