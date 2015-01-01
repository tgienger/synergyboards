'use strict';

describe('Controller: ForumviewCtrl', function () {

  // load the controller's module
  beforeEach(module('synergyApp'));

  var ForumviewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ForumviewCtrl = $controller('ForumviewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
