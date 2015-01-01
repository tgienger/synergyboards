'use strict';

angular.module('synergyApp')
  .controller('ForumviewCtrl', ['$scope', '$http', 'streamForums', function ($scope, $http, streamForums) {

    $http.get('/boards/boards/').success(function(res) {
      console.log(res);
    });

  }]);
