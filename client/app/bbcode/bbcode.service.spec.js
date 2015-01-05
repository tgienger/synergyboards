'use strict';

describe('Service: bbcode', function () {

  // load the service's module
  beforeEach(module('synergyApp'));

  // instantiate service
  var bbcode;
  beforeEach(inject(function (_bbcode_) {
    bbcode = _bbcode_;
  }));

  it('should do something', function () {
    expect(!!bbcode).toBe(true);
  });

});
