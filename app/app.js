'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [

    'ngRoute',
    'myApp.dashboard',
    'myApp.tasks',
    'myApp.departments',
    'myApp.employees',
    'myApp.version',
    'myApp.dashboard',
    'myApp.calendar'




]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/dashboard'});
}]);
