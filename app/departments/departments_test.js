'use strict';

describe('myApp.departments module', function() {

  beforeEach(module('myApp.departments'));

  describe('departments controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var departmentsCtrl = $controller('departmentsCtrl');
      expect(departmentsCtrl).toBeDefined();
    }));

  });
});