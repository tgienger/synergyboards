'use strict';

describe('Controller: ThreadViewCtrl', function () {

  // load the controller's module
  beforeEach(module('synergyApp'));

  var ThreadViewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ThreadViewCtrl = $controller('ThreadViewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
