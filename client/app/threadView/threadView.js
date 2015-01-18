'use strict';

angular.module('synergyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('threadView', {
        url: '/thread/:id',
        templateUrl: 'app/threadView/threadView.html',
        controller: 'ThreadViewCtrl'
      });
  });
