'use strict';

describe('Service: streamForums', function () {

  // load the service's module
  beforeEach(module('synergyApp'));

  // instantiate service
  var streamForums;
  beforeEach(inject(function (_streamForums_) {
    streamForums = _streamForums_;
  }));

  it('should do something', function () {
    expect(!!streamForums).toBe(true);
  });

});
