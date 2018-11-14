'use strict';

describe('myApp.tasks module', function() {

  beforeEach(module('myApp.tasks'));

  describe('tasks controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var TasksCtrl = $controller('TasksCtrl');
      expect(TasksCtrl).toBeDefined();
      var tasksCtrl = $controller('tasksCtrl');
      expect(tasksCtrl).toBeDefined();
    }));

  });
});