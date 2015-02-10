'use strict';

angular.module('synergyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('threadview', {
        url: '/thread/:id?pid&scrollto',
        templateUrl: 'app/threadView/threadView.html',
        controller: 'ThreadViewCtrl',
        ncyBreadcrumb: {
            label: '{{thread[0].subject}}',
            parent: 'forumview'
        }
      });
  });
