'use strict';

angular.module('synergyApp')
  .filter('toTrusted', ['$sce', function ($sce) {
    return function (input) {
      return $sce.trustAsHtml(input);
    };
  }]);
