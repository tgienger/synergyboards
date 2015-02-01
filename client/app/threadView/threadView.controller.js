(function () {
    'use strict';

    angular.module('synergyApp')
    .controller('ThreadViewCtrl', function ($scope, $http, streamForums, $stateParams) {

        $http.get('/api/boards/thread/'+ $stateParams.id).success(function(b) {
            // $scope.maximized = false;
            $scope.thread = $scope.thread || [];
            console.log(b);
            streamForums.showThread($scope.thread || ($scope.thread = []), b);
            $scope.breadcrumbs = [
                {name: 'Home', url: 'main'},
                {name: $scope.thread[0].grandParent, url: 'forumview({id: thread[0].fid})'},
                {name: $scope.thread[0].subject, url: null},
            ];
        });


        $scope.compose = function(thread, type) {
            if (type === 'post') {
                thread.subject = $scope.thread[0].subject;
            }
            $scope.synergyComposer.submit(thread, type);
        };

        $scope.submit = function() {
            console.log('Posting to database');
        };

    });
}());
