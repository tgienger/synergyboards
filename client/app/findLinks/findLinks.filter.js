(function () {

    'use strict';

    angular.module('synergyApp')
        .filter('findLinks', function () {

            /**
             * [replacer description]
             * @type {Object}
             */
            function Replacer() {
                return {
                    image: function (match) {
                        return '<img src="' + match + '" />';
                    },
                    youtube: function (match) {
                        return '<iframe width="560" height="315" src="' + match + '" frameborder="0" allowfullscreen></iframe>';
                    },
                    url: function (match) {
                        if (match === '\n') {
                            return '<br>';
                        }
                        if (match === '\r') {
                            return '';
                        }
                        return '<a href="' + match + '">' + match + '</a>';
                    }
                };
            }

            var rx_url = /([\r\n])/g,
                rx_img_url = /(\shttps?:\/\/.*\.(png|jpg|gif))/ig,
                // fix_embed = /((?:https|http):)\/\/(?:[^"]*)(watch\?v=)/g,
                rx_youtube = /(?:\shttps?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/g,
                replacer = new Replacer();


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
}());
