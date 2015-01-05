'use strict';

angular.module('synergyApp')
  .filter('bbcode', ['$http', 'streamForums', function ($http, streamForums) {

    /**
     * regex matching [quote='quotedperson' pid='21' dateline='241241234']quoted text[/quote]
     * @type {RegExp}
     */
    var quote_re = /\[(quote='([^"]*)'\s?pid='([^"]*)'\s?dateline='([^"]*)'\])([^"]*)\[(\/quote)\]/g;
    var any_bbcode_re = /(?:\[([a-z]{1,16})(?:(?:=)(?:"|')?([a-zA-Z0-9]*)(?:"|')?)?\s?(?:([a-z]{1,3})(?:=)(?:"|')([0-9]{1,100})(?:"|'))?\s?(?:([a-z]{1,16})(?:=)(?:"|')([0-9]{1,16})(?:"|'))?(?:\])([^"]*)(?:\[\/)([a-z]{1,16})(?:\]))/ig;
    var quote_start_re = /\[quote[^"]*\]([^"]*)\[\/quote\]/;
    var find_tags = /(?:\[([a-z]{1,16})(?:(?:=)(?:"|')?([a-zA-Z0-9]*)(?:"|')?)?\s?(?:([a-z]{1,3})(?:=)(?:"|')([0-9]{1,100})(?:"|'))?\s?(?:([a-z]{1,16})(?:=)(?:"|')([0-9]{1,16})(?:"|'))?(?:\])([^"]*)(?:\[\/)([a-z]{1,16})(?:\]))/ig;
    var yt_link_re = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;


    /**
     * parses bbcode to html
     * @param  {string} match  matched string
     * @param  {string} p1     opening tag
     * @param  {string} p2     opening tag value
     * @param  {string} p3     opt tag 1 length 1-3
     * @param  {number} p4     opt tag 1 value
     * @param  {string} p5     opt tag 2 length 1-16
     * @param  {number} p6     opt tag 2 value
     * @param  {string} p7     text between opening & closing tags
     * @param  {string} p8     closing tag
     * @param  {number} offset
     * @param  {string} string
     * @return {string}        Html from the parsed bbcode
     */
    function replacer(match, p1, p2, p3, p4, p5, p6, p7, p8, offset, string) {

      console.log('start');
      switch (p1) {

        case 'q':
        case 'blockquote':
        case 'quote':
          if (p6 && p6.length) {
            p6 = new Date(p6*1000);
          }
          if (p4 && !isNaN(p4)) {
            return '<div class="quote"><div class="quote_top"><span class="quoted">'+p2+' wrote: </span>&nbsp;<a href="/forum/showthread?pid=' + p4 + '#' + p4 + '" class="quote_link fa"></a> <span class="quote_date">('+p6+')</span></div> '+p7+'</div>';
          } else if (p2 && p2.length) {
            return '<div class="quote"><div class="quote_top"><span class="quoted">'+p2+' wrote: </span>&nbsp; <span class="quote_date">('+p6+')</span></div> '+p7+'</div>';
          } else {
            '<div class="quote"></div> '+p7+'</div>';
          }

        case 'video':
          if (p2 === 'youtube') {
            if(yt_link_re.test(p7)) {
              p7 = p7.replace(yt_link_re, '<iframe width="560" height="315" src="//www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>')
              return p7;
            }
          }

        default:
          return string;
      }

    }

    /**
     * parsed bbcode's [quote] to Html
     * @param  {string} str string to be parsed
     * @return {string}     parsed html
     */
    function quotes(str) {
      if (!str || !str.length) return str;

      str = str.replace(find_tags, replacer)

      return str;
    }

    // Public API here
    return function(str) {
      return quotes(str);
    }
  }]);
