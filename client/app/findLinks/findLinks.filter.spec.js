'use strict';

describe('Filter: findLinks', function () {

  // load the filter's module
  beforeEach(module('synergyApp'));

  // initialize a new instance of the filter before each test
  var findLinks;
  beforeEach(inject(function ($filter) {
    findLinks = $filter('findLinks');
  }));

  it('should return the input prefixed with "findLinks filter:"', function () {
    var text = 'angularjs';
    expect(findLinks(text)).toBe('findLinks filter: ' + text);
  });

});
