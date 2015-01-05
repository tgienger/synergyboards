'use strict';

angular.module('synergyApp')
  .filter('bbcode', ['$http', 'streamForums', function ($http, streamForums) {

    /**
     * regex matching [quote='quotedperson' pid='21' dateline='241241234']quoted text[/quote]
     * @type {RegExp}
     */
    var quote_re = /\[(quote='([^"]*)'\s?pid='([^"]*)'\s?dateline='([^"]*)'\])([^"]*)\[(\/quote)\]/g;
    var any_bbcode_re = /(?:\[([a-z]{1,16})(?:(?:=)(?:"|')([a-zA-Z0-9]*)(?:"|'))?\s?(?:([a-z]{1,3})(?:=)(?:"|')([0-9]{1,100})(?:"|'))?\s?(?:([a-z]{1,16})(?:=)(?:"|')([0-9]{1,16})(?:"|'))?(?:\])([^"]*)(?:\[\/)([a-z]{1,16})(?:\]))/ig;
    var quote_start_re = /\[quote[^"]*\]([^"]*)\[\/quote\]/;

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

      var m2, m3, m4, m5 = '';

      if (p2 && p2.length) {
        m2 = p2;
      }
      if (p3 && p3.length) {
        m3 = p3;
      }
      if (p5 && p5.length) {
        m5 = p5;
      }
      if (p6 && p6.length) {
        p6 = new Date(p6*1000);
      }
      if (p4 && !isNaN(p4)) {
        return '<div class="quote"><div class="quote_top"><span class="quoted">'+p2+' wrote: </span>&nbsp;<a href="/forum/showthread?pid=' + p4 + '#' + p4 + '" class="quote_link fa"></a> <span class="quote_date">('+p6+')</span></div> '+p7+'</div>';
      } else if (p2 && p2.length){
        return '<div class="quote"><div class="quote_top"><span class="quoted">'+p2+' wrote: </span>&nbsp; <span class="quote_date">('+p6+')</span></div> '+p7+'</div>';
      } else {
        '<div class="quote"></div> '+p7+'</div>';
      }

    }

    /**
     * parsed bbcode's [quote] to Html
     * @param  {string} str string to be parsed
     * @return {string}     parsed html
     */
    function quotes(str) {
      if (!str || !str.length) return str;
      if (str.search(any_bbcode_re) !== -1) {
        while(str.search(any_bbcode_re) !== -1) {
          str = str.replace(any_bbcode_re, replacer);
          console.log(str)
        }
      } else if (quote_start_re.test(str)) {
        str = str.replace(quote_start_re, '<blockquote>$1</blockquote>')
      }
      return str;
    }
    // var fake = '[quote]famous quote[/quote]';
    // var newfake = quotes(fake);
    // console.log(newfake);

    // Public API here
    return function(str) {
      return quotes(str);
    }
  }]);
