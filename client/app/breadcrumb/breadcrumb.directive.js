'use strict';

angular.module('synergyApp')
  .directive('breadcrumb', function () {
    return {
      template: '<ol class="breadcrumb">'+
                    '<li ng-repeat="breadcrumb in breadcrumbs">'+
                    '<a ng-if="breadcrumb.url" ui-sref="{{breadcrumb.url}}" style="">{{breadcrumb.name}}</a>'+
                    '<span ng-if="!breadcrumb.url" class="currentBreadcrumb">{{breadcrumb.name}}</span>'+
                    '</li>'+
                '</ol>',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
