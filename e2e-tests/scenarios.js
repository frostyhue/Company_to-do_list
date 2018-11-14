'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /tasks when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/tasks");
  });


  describe('tasks', function() {

    beforeEach(function() {
      browser.get('index.html#!/tasks');
    });


    it('should render tasks when user navigates to /tasks', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('departments', function() {

    beforeEach(function() {
      browser.get('index.html#!/departments');
    });


    it('should render departments when user navigates to /departments', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
