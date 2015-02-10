'use strict';

angular.module('synergyApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ngMaterial',
  'ui.router',
  'ui.bootstrap',
  'ncy-angular-breadcrumb',
  'ui',
  'ui.select',
  'synergy.composer',
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

  });
