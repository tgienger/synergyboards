'use strict';

angular.module('synergyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('forumview', {
        url: '/forum/:id',
        templateUrl: 'app/forumview/forumview.html',
        controller: 'ForumviewCtrl',
        ncyBreadcrumb: {
          label: '{{forums[0].parent}}',
          parent:'main'
        }
      });
  });
