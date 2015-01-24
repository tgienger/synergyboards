'use strict';

angular.module('synergyApp')
  .controller('MainCtrl', ['$scope', '$http', 'streamForums', '$rootScope', function ($scope, $http, streamForums, $rootScope) {

    $scope.breadcrumbs = [
        {name: 'Home', url: ''}
    ];
    $scope.boards = [];
    var threads = [];


    $http.get('/api/boards').success(function(b) {
      streamForums.showForums($scope.boards || ($scope.boards = []), b);
    });

    $scope.threads = threads;

  }]);
