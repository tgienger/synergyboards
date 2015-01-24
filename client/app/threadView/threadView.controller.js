(function () {
    'use strict';

    angular.module('synergyApp')
    .controller('ThreadViewCtrl', function ($scope, $http, streamForums, $stateParams) {

        $http.get('/api/boards/thread/'+ $stateParams.id).success(function(b) {
            // $scope.maximized = false;
            $scope.thread = $scope.thread || [];
            streamForums.showThread($scope.thread || ($scope.thread = []), b);
            $scope.breadcrumbs = [
                {name: 'Home', url: 'main'},
                {name: $scope.thread[0].grand_parent, url: 'forumview({id: thread[0].fid})'},
                {name: $scope.thread[0].subject, url: null},
            ];
        });

        function Composer() {

            return {
                markdown: '',
                subject: '',
                topic: '',
                markdown_list: [],
                thread: {},
                collapse: true,
                submit: 'Post',
                removeEmpty: function(arr, removed) {
                    var index = -1;
                    var length = arr ? arr.length : 0;
                    var array = arr;

                    while (++index < length) {
                        if (array[index] == removed) {
                            array.splice(index, 1);
                            index--
                        }
                    }
                    return array;
                },
                toQuote: function() {
                    var quoted = this.thread.username;
                    var str = this.thread.message.split('\n');
                    str = this.removeEmpty(str, false);

                    for (var i = 0; i < str.length; i++) {
                        str[i] = '>'+str[i];
                    }
                    var quote = str.join('\n\n');

                    switch (this.markdown_list.length) {
                        case 0:
                            quote = quote + '\n\n';
                            break;
                        default:
                            quote = '\n\n' + quote + '\n\n';
                            break;
                    }
                    return quoted + ': \n' + quote;
                },
                toReply: function() {
                    if (this.markdown_list.length > 0) {
                        return '\n\n@' + this.thread.username + ':\n\n';
                    }
                    return '@' + this.thread.username + ':\n\n';
                },
                build: function(type) {
                    switch(type) {
                        case 'quote':
                            return this.toQuote();

                        case 'reply':
                            return this.toReply();

                        default:
                            return;
                    }
                }

            };
        }

        var composer = new Composer();

        $scope.composer = composer;

        $scope.closeComposer = function(exit) {
            if (exit) {
                composer.markdown_list = [];
            }
            composer.collapse = true;
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
            composer.topic = thread.grand_parent;
            if (type === 'reply' || type === 'quote') {
                composer.subject = 'RE: ' + thread.subject;
            } else {
                composer.subject = 'RE: ' + $scope.thread[0].subject;
            }
            composer.markdown_list.push(composer.build(type));
            composer.markdown = composer.markdown_list.join('\n')
            // $scope.composer.collapse = !$scope.composer.collapse;
        }

    });
}());
