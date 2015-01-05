'use strict';

angular.module('synergyApp')
  .factory('streamForums', ['$http', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
  // })
  // .factory("Forums", ['$http', function($http) {
      function sortByGmdateCreated(a, b) {
        return b.gmdate_latest_reply - a.gmdate_latest_reply
      }
      return {
        showForums: function(viewModel, results) {
          var merged;
          merged = viewModel.concat(results);
          angular.forEach(results, function(post) {
            post.replies = post.replies || [];
            if (post.pid > 0) {
              angular.forEach(merged, function(parent) {
                if (parent.fid === post.pid) {
                  parent.replies.push(post)
                }
              })
            } else {
              viewModel.push(post)
            }
          });
          angular.forEach(viewModel, function(parent) {
            if (angular.isArray(parent.replies)) {
              parent.replies.sort(sortByGmdateCreated)
            }
          });
          // viewModel.sort(sortByGmdateCreated)
        },

        showThread: function(viewModel, results) {
          var merged;
          merged = viewModel.concat(results);
          angular.forEach(results, function(post) {
            post.replies = post.replies || [];
            if (post.replyto > 0) {
              angular.forEach(merged, function(parent) {
                parent.replies = parent.replies || [];
                if (parent.pid === post.replyto) {
                  parent.replies.push(post)
                }
              })
            } else {
              viewModel.push(post)
            }
          });
          // angular.forEach(viewModel, function(parent) {
          //   if (angular.isArray(parent.replies)) {
          //     parent.replies.sort(sortByGmdateCreated)
          //   }
          // });
          // viewModel.sort(sortByGmdateCreated)
        },

        getThreadId: function(pid) {
          $http.get('/api/boards/thread/' + pid).then(function(result) {
            console.log(result[0].tid)
            return result[0].tid;
          });
        }
      }
    }
  ]);
