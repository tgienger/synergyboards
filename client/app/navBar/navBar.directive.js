'use strict';
'use 6to5';

angular.module('synergyApp')
  .directive('navBar', ['$timeout', 'search', '$state', '$stateParams', '$anchorScroll', '$location', '$rootScope', function ($timeout, search, $state, $stateParams, $anchorScroll, $location, $rootScope) {
    return {
      templateUrl: 'app/navBar/navBar.html',
      restrict: 'E',
      scope: {},
      link: function (scope, element, attrs) {

          scope.searchCollapse = true;
          scope.searchResults = [];
          scope.posts = [];
          scope.users = [];
          scope.term = '';
          scope.searching = false;



          // Toggles the search bar, resets everything back to empty for
          // a clean start.
          scope.openSearch = function() {
              scope.searchResults = [];
              scope.posts = [];
              scope.users = [];
              scope.term = '';
              scope.searchCollapse = !scope.searchCollapse;
          };



          /**
           * When an item in the search results is selected we change to the
           * desired state, scroll the page so the result is at the top and
           * highlight it.
           * @param {object} obj The selected item
           */
          scope.selectItem = function(obj) {
              scope.searchResults = [];
              scope.searchCollapse = true;

              /**
               * Sets the transition options for the parent of an element
               * @param {string}   id       id of the child element
               * @param {string}   prop     Property to set (ex: background)
               * @param {string}   delay    Duration of the transition (ex: 1000ms)
               * @param {string}   style    What style of transition (ex: ease)
               * @param {Function} callback Optional callback
               */
              function setParentTransition(id, prop, delay, style, callback) {
                  $(id).parent('li').css({'-webkit-transition' : prop + ' ' + delay + ' ' + style});
                  $(id).parent('li').css({'-moz-transition' : prop + ' ' + delay + ' ' + style});
                  $(id).parent('li').css({'-o-transition' : prop + ' ' + delay + ' ' + style});
                  $(id).parent('li').css({'transition' : prop + ' ' + delay + ' ' + style});
                  (callback || angular.noop)();
              }

              if (obj.pid) {
                  // If the selected item has a pid, then process as a post

                  $state.go('threadview', {id:obj.tid, scrollto: obj.pid});

                  // After state has changed we'll set a small delay and then
                  // we'll scroll the page and highlight the searched item.
                  $rootScope.$on('$stateChangeSuccess', function() {
                      var id = '#' + $stateParams.scrollto;
                      $timeout(function() {

                          // scroll to the element
                          $('html, body').animate({scrollTop: $(id).offset().top}, 0);

                          // adds the highlight color
                          setParentTransition(id, 'background', '0s', 'ease', function() {
                              $(id).parent('li').addClass('found');
                          });

                          // In the next cycle we'll change the transition
                          // parameteres and start the hightlight removal.
                          $timeout(function() {
                              setParentTransition(id, 'background', '3s', 'ease', function() {
                                  $(id).parent('li').removeClass('found');
                              });
                          });
                    }, 100);
                  });

              } else {
                  // Else process as a user
                  console.log(obj);
              }
          };



          /**
           * Initiate Search
           * @param  {string} term The string you'll be searching for
           */
          scope.search = function(term) {

              // start by setting search results to empty so new ones don't
              // stack.
              scope.searchResults = [];

              // set as actively searching - search icon
              scope.searching = true;

              // Don't do any database queries if the search term is less
              // than 3 characters in length.
              if (term.length > 2) {

                  // activating the search service
                  search.forums(term).success(function(result) {


                      // we'll only be displaying the first 5 results.
                       scope.posts = result.slice(0, 5);

                       // Now that forums were searched, lets also search for
                       // usernames.
                       // TODO: Combine both searches in a cleaner fashion.
                       search.users(term).success(function(result) {

                           // again we only want the first 5 results.
                           scope.users = result.slice(0, 5);

                           // lets concatonate the search results together
                           // for future use as one array.
                           scope.searchResults = scope.posts.concat(scope.users);

                           // After 300ms we'll stop the rotating 'search' icon.
                           $timeout(function() {
                               scope.$evalAsync(scope.searching = false);
                           }, 300);

                       }).error(function(err) {
                           console.log(err);
                       });
                  }).error(function(err) {
                       console.log(err);
                  });
              }

          };



        // The results contain users ?
        scope.hasUsers = function() {
            return scope.users.length > 0;
        };



        // The results contain posts ?
        scope.hasPosts = function() {
            return scope.posts.length > 0;
        };
      },
    };
}]);
