'use strict';

describe('Directive: forums', function () {

  // load the directive's module and view
  beforeEach(module('synergyApp'));
  beforeEach(module('app/forums/forums.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<forums></forums>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the forums directive');
  }));
});