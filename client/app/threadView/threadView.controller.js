'use strict';

angular.module('synergyApp')
.controller('ThreadViewCtrl', function ($scope, $http, streamForums, $stateParams) {
    $http.get('/api/boards/thread/'+ $stateParams.id).success(function(b) {
        $scope.thread = $scope.thread || [];
        // $scope.thread = b;
        streamForums.showThread($scope.thread || ($scope.thread = []), b);
    });

    var composer = {
        markdown: '',
        thread: {},
        collapse: true,
    };

    $scope.composer = composer;

    $scope.closeComposer = function(exit) {
        if (exit) {
            composer.markdown = '';
        }
        composer.collapse = true;
    }

    /**
     * removes new lines, prepends quote character
     * @return {string} quoted text
     */
    function createMessage(c, type)
    {
        switch(type) {
            case 'quote':
                var quoted = c.thread.username;

                var str = c.thread.message.split('\n');
                str = sx.array.remove(str, false);
                var quote = str.quote(quoted);
                return c.markdown += quote;
            case 'reply':
                return c.markdown += c.thread.username;
            default:
                return c.markdown;
        }
    }

    $scope.compose = function(thread, type)
    {
        if (!composer.thread) {
            composer.collapse = true;
        }
        else {
            composer.collapse = false;
        }

        composer.thread = thread;
        composer.markdown = createMessage(composer, type);
        // $scope.composer.collapse = !$scope.composer.collapse;
    }

});
