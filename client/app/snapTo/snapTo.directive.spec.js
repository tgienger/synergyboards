'use strict';

describe('Directive: snapTo', function () {

  // load the directive's module
  beforeEach(module('synergyApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<snap-to></snap-to>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the snapTo directive');
  }));
});