'use strict';

angular.module('synergyApp')
  .filter('findLinks', function () {
    return function (input) {

      var rx_url = /(http|ftp|https):\/\/([\w\-_]+(?:(?:\.[\w\-_]+)+))([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
      var rx_img_url = /(http|ftp|https):\/\/([\w\-_]+(?:(?:\.[\w\-_]+)+))([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#]).(?:jpg|gif|png)$/;
      var url = input.match(rx_url);

      if (url) {
        // check if url ends with an image .jpg, .tif, .png, .gif
        // if it does, place it within an <img> tag
        var img_url = input.match(rx_img_url);
        if (img_url) {
          input = input.replace(img_url[0], '<img src="'+img_url[0]+'" />')
        } else {
          input = input.replace(url[0], '<a href="'+url[0]+'">'+url[0]+'</a>');
        }
      }
      return input;
    };
  });
