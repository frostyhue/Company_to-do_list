'use strict';

describe('myApp.employees module', function() {

  beforeEach(module('myApp.employees'));

  describe('employees controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var EmployeesCtrl = $controller('employeesCtrl');
      expect(EmployeesCtrl).toBeDefined();
      var employeesCtrl = $controller('employeesCtrl');
      expect(employeesCtrl).toBeDefined();
    }));

  });
});