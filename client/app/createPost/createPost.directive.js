'use strict';

angular.module('synergyApp')
  .directive('createPost', function () {
    return {
      templateUrl: 'app/createPost/createPost.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

      $(function() {
          // Replace all textarea's
          // with SCEditor
          $("textarea").sceditor({
              plugins: "bbcode",
              resizeMaxWidth: 900,
              style: "minified/jquery.sceditor.default.min.css"
          });
      });
      }
    };
  });
