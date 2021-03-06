'use strict';

angular.module('synergyApp')
  .filter('findLinks', function () {

    var rx_url = /(?:^|\s|\n|\r|\<br\>)((?:http|ftp|https):\/\/(?:[\w\-_]+(?:(?:\.[\w\-_]+)+))(?:[\w\-\.,@?^=%&amp;:/~\+\!#]*[\w\-\@?^=%&amp;/~\+#]))/ig;
    var rx_img_url = /(\shttps?:\/\/.*\.(png|jpg|gif))/ig;
    var fix_embed = /((?:https|http):)\/\/(?:[^"]*)(watch\?v=)/;
    var rx_youtube = /(?:\shttps?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/ig;

    /**
     * [replacer description]
     * @type {Object}
     */
    var replacer = {
      image: function(match, p1, p2, offset, string) {
        return '<img src="'+match+'" />';
      },
      youtube: function(match, p1, p2, offset, string) {
        return '<iframe width="560" height="315" src="'+match+'" frameborder="0" allowfullscreen></iframe>';
      },
      url: function(match, p1, p2, offset, string) {
        return '<a href="'+p1+'">'+p1+'</a>';
      }
    }

    function parseUrl(str) {
      if (rx_youtube.test(str)) {
        return str.replace(rx_youtube, replacer.youtube);
      }
      if (rx_img_url.test(str)) {
        return str.replace(rx_img_url, replacer.image);
      }
      if (rx_url.test(str)) {
        return str.replace(rx_url, replacer.url);
      }
      return str;

    }

    return function (input) {
      return parseUrl(input);
    };
  });
