'use strict';

describe('Directive: createPost', function () {

  // load the directive's module and view
  beforeEach(module('synergyApp'));
  beforeEach(module('app/createPost/createPost.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<create-post></create-post>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the createPost directive');
  }));
});