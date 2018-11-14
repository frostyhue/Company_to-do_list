'use strict';

var app = angular.module('myApp.calendar', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/calendar', {
        templateUrl: 'calendar/calendar.html',
        controller: 'CalendarCtrl'
    });
}]);




