'use strict';

angular.module('synergyApp')
  .factory('search', ['$http', function ($http) {


      return {

         forums: function(query) {
             return $http.get('/api/boards/searchall/'+query);
         },
         users: function(query) {
             return $http.get('/api/users/search/'+query);
         }
      };
  }]);
