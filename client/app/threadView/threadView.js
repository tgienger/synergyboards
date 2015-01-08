'use strict';

angular.module('synergyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('threadView', {
        url: '/forumdisplay',
        templateUrl: 'app/threadView/threadView.html',
        controller: 'ThreadViewCtrl'
      });
  });