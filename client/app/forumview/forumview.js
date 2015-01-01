'use strict';

angular.module('synergyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('forumview', {
        url: '/forumview',
        templateUrl: 'app/forumview/forumview.html',
        controller: 'ForumviewCtrl'
      });
  });