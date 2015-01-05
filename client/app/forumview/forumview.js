'use strict';

angular.module('synergyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('forumview', {
        url: '/forum/showthread?fid&tid&pid',
        templateUrl: 'app/forumview/forumview.html',
        controller: 'ForumviewCtrl'
      });
  });
