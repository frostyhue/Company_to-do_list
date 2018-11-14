'use strict';

angular.module('myApp.dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
     $routeProvider.when('/dashboard', {
     templateUrl: 'dashboard/dashboard.html',
     controller: 'dashboardCtrl'
    });
}])

.controller('dashboardCtrl', ['$scope', 'employeesService','departmentService', 'tasksService', function ($scope, employeesService, departmentService, tasksService) {


    $scope.newEmp = [];
    employeesService.getEmployees()
        .then(function (response) {
            $scope.newEmp = response.data;
        }) ,
        function (error) {
            $scope.error = error;
        };
    $scope.newTask = [];
    tasksService.getTasks()
        .then(function (response) {
            $scope.newTask = response.data;
            console.log($scope.newTask);
        }) ,
        function (error) {
            $scope.error = error;
        };
    $scope.newDeps = [];
    departmentService.getDepartments()
        .then(function (response) {
            $scope.newDeps = response.data;
            console.log($scope.newDeps);
        }) ,
        function (error) {
            $scope.error = error;
        };

}]);