'use strict';

angular.module('synergyApp')
  .filter('bbcode', function () {

    // regex matching [tag='tagvalue' tag2='tag2value' tag3='tag3value']tagged text[/tag]
    var find_tags_re = /(?:\[([a-z]{1,16})(?:(?:=)(?:"|')?([a-zA-Z0-9\/\:\.\-]*)(?:"|')?)?\s?(?:([a-z]{1,3})(?:=)(?:"|')([0-9]{1,100})(?:"|'))?\s?(?:([a-z]{1,16})(?:=)(?:"|')([0-9]{1,16})(?:"|'))?(?:\])([^"]*)(?:\[\/)([a-z]{1,16})(?:\]))/ig;

    // finds youtube video code in url
    var yt_link_re = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/ig;

    // Allowed bbcode tags
    var valid_tags_re = /^\/?(?:b|i|u|pre|center|samp|code|colou?r|size|noparse|url|link|s|q|quote|blockquote|video|img|u?list|li)$/i;


    // check for valid tag
    function validTag(tag) {
      if (!tag || !tag.length) {return false;}
      return valid_tags_re.test(tag);
    }

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
    function replacer(match, p1, p2, p3, p4, p5, p6, p7, p8, offset, string)
    {

      if (validTag(p1)) {
        p1 = p1.toLowerCase();

        switch (p1) {


          // custom quote tags based on mybb forum quotes
          case 'q':
          case 'blockquote':
          case 'quote':
            if (p6 && p6.length) {
              p6 = new Date(p6*1000);
            }
            if (p4 && !isNaN(p4)) {
              return '<a style="text-decoration:underline;color:blue;" href="/user/'+p2+'" class="quoted">'+p2+'</a> wrote: &nbsp;<a href="/forum/showthread?pid=' + p4 + '#' + p4 + '" class="quote_link fa"></a><blockquote class="quote"> '+p7+'</blockquote>';
            } else if (p2 && p2.length) {
              return '<span class="quoted">'+p2+' wrote: </span><blockquote class="quote"> '+p7+'</blockquote>';
            } else {
              return '<blockquote class="quote"> '+p7+'</blockquote>';
            }

          case 'video':
            if (p2 === 'youtube') {
              if(yt_link_re.test(p7)) {
                p7 = p7.replace(yt_link_re, '<iframe width="560" height="315" src="//www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>')
                return p7;
              }
          } else {
              return;
          }

          case 'b':
            return '<b>' + p7 + '</b>';

          case 'i':
            return '<em>' + p7 + '</em>';

          case 'u':
            return '<u>' + p7 + '</u>';

          case 'url':
              return '<a href="'+p2+'">'+p7+'</a>';

          case 'img':
              return '<img src="'+p7+'" />';

          default:
            return string;
        }

      }

    }

    /**
     * parsed bbcode's [quote] to Html
     * @param  {string} str string to be parsed
     * @return {string}     parsed html
     */
    function bbc2html(str) {
        if (typeof str === 'object') {
            str.forEach(function(s) {
                if(!s || !s.length) {
                    s = s;
                }
                else{
                    s = s.replace(find_tags_re,replacer);
                }
            })
        } else {
            if (!str || !str.length) return str;

            str = str.replace(find_tags_re, replacer)

        }

      return str;
    }
    // Public API here
    return function(str) {
      return bbc2html(str);
    }
  });
