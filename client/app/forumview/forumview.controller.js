'use strict';

angular.module('synergyApp')
    .controller('ForumviewCtrl', ['$scope', '$http', '$stateParams', 'streamForums', function ($scope, $http, $stateParams, streamForums) {

        $scope.forums  = [];

        function Composer() {
            return {
                markdown: '',
                subject: '',
                topic: '',
                thread: {},
                submit: 'Topic',
                collapse: true
            };
        }

        var composer = new Composer();
        $scope.composer = composer;

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
            composer.collapse = false;
            composer.topic = post.parent;

        }
        $scope.closeComposer = function(exit) {
            if (exit) {
                composer.markdown = '';
            }
            composer.collapse = true;
        }



}]);
