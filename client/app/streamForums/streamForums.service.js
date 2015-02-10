'use strict';

angular.module('synergyApp')
  .factory('streamForums', ['$http', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
  // })
  // .factory("Forums", ['$http', function($http) {
      function sortByDateline(a, b) {
        return a.dateline - b.dateline;
      }
      function sortByDispOrder(a, b) {
          return a.disporder - b.disporder;
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
                  parent.replies.push(post);
                }
              });
            } else {
              viewModel.push(post);
              viewModel.sort(sortByDispOrder);
            }
          });
          angular.forEach(viewModel, function(parent) {
            if (angular.isArray(parent.replies)) {
              parent.replies.sort(sortByDispOrder);
            }
          });
          // viewModel.sort(sortByGmdateCreated)
        },

        showThread: function(viewModel, results) {
          angular.forEach(results, function(post) {
              viewModel.push(post);
          });
          viewModel.sort(sortByDateline);
        },
      }
    }
  ]);
