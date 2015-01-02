'use strict';

angular.module('synergyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('forumview', {
        url: '/forumview/:id',
        templateUrl: 'app/forumview/forumview.html',
        controller: 'ForumviewCtrl'
      });
  });
