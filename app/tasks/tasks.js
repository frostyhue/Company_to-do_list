'use strict';

var app = angular.module('myApp.tasks', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tasks', {
    templateUrl: 'tasks/tasks.html',
    controller: 'TasksCtrl'
  });
}])

.service('tasksService', ['$http', function($http){

    // obj.data =[
    //     {id: 1, description: "Find project work", duration:"1 hour", starts:"10:30"},
    //     {id: 2, description: "Work on documents", duration:"2 hours", starts:"11:30"},
    //     {id: 3, description: "Work on self reflection", duration:"always", starts:"now"}
    // ];
    this.getTasks = function(){
        return $http.get('http://i874156.iris.fhict.nl/WEB2/tasks');
    }
}]);

app.controller('TasksCtrl',['$scope','tasksService', function ($scope, tasksService) {

    $scope.tasks = [];
    tasksService.getTasks()
        .then(function (response) {
            $scope.tasks = response.data;
        }) ,
        function (error) {
            $scope.error = error;
        };
    $scope.add= function(){
        {var i = $scope.tasks.length+1;
            if( $scope.deptNo === '' || $scope.title === '' ||$scope.description=== '' || $scope.status === '' ||$scope.finishedDate === ''|| $scope.modificationDate === '' ||$scope.creatioDate=== ''  || $scope.deptNo === undefined || $scope.title === undefined ||$scope.description=== undefined || $scope.status === undefined ||$scope.finishedDate === undefined|| $scope.modificationDate === undefined ||$scope.creatioDate=== undefined  ){
                alert('Please fill in all the fields')

            }
            else {
                $scope.tasks.push({no: i, deptNo: $scope.deptNo, title: $scope.title, description: $scope.description, status: $scope.status, finishedDate: $scope.finishedDate, modificationDate: $scope.modificationDate, creatioDate: $scope.creatioDate
                });
                $scope.no = '';
                $scope.deptNo = '';
                $scope.title = '';
                $scope.description = '';
                $scope.status = '';
                $scope.finishedDate = '';
                $scope.modificationDate = '';
                $scope.creatioDate = '';
            }
        }
    };
    $scope.delete = function(id){
        var result = confirm('Are you sure you want to delete this?');
        if (result === true){
            var index = getSelectedIndex(id);
            $scope.tasks.splice(index, 1);
        }
    };
    $scope.selectEdit = function(id){
        var task = $scope.tasks[id-1];
        $scope.no = task.no;
        $scope.deptNo = task.deptNo;
        $scope.title= task.title;
        $scope.description= task.description;
        $scope.status = task.status;
        $scope.finishedDate = task.finishedDate;
        $scope.modificationDate = task.modificationDate;
        $scope.creatioDate = task.creatioDate;
    };
    $scope.edit = function(){
        var task = $scope.tasks[$scope.no-1];
        task.no=$scope.no;
        task.deptNo = $scope.deptNo ;
        task.title = $scope.title ;
        task.description = $scope.description ;
        task.status = $scope.status  ;
        task.finishedDate = $scope.finishedDate  ;
        task.modificationDate = $scope.modificationDate  ;
        task.creatioDate = $scope.creatioDate  ;
    }
    function getSelectedIndex(id){
        for(var i=0; i<$scope.tasks.length; i++){
            if($scope.tasks[i].no==id){
                return i;
            }
        }
    }
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
    $scope.depNames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16]
    $scope.statuses = ["In Progress", "Finished"]
}])

.directive('tasksDirective', function(){
    return{
        template:
        '<h4>Tasks List</h4>\n' +
        '<div>\n' +
        'search tasks:\n' +
        '</div>\n' +
        '<div>\n' +
        '<input class="box" placeholder="Search tasks..." ng-model="filterValueTasks"/>\n' +
        '</div>\n' +
        '&nbsp\n' +
        '<h4>Sorting is done by clicking on the column name!</h4>\n' +
        '<table class="table table-bordered table-condensed">\n' +
        '<tr>\n' +
        '<th class="pointer" ng-click="sort(\'no\')">Task Number <span class="glyphicon sort-icon" ng-show="sortKey==\'no\'" ng-class="{\'glyphicon-chevron-up\':reverse,\'glyphicon-chevron-down\':!reverse}"></span> </th>\n' +
        '<th class="pointer" ng-click="sort(\'deptNo\')" >Department Number<span class="glyphicon sort-icon" ng-show="sortKey==\'deptNo\'" ng-class="{\'glyphicon-chevron-up\':reverse,\'glyphicon-chevron-down\':!reverse}"></span></th>\n' +
        '<th class="pointer" ng-click="sort(\'title\')">Title<span class="glyphicon sort-icon" ng-show="sortKey==\'title\'" ng-class="{\'glyphicon-chevron-up\':reverse,\'glyphicon-chevron-down\':!reverse}"></span></th>\n' +
        '<th class="pointer" ng-click="sort(\'description\')">Description<span class="glyphicon sort-icon" ng-show="sortKey==\'description\'" ng-class="{\'glyphicon-chevron-up\':reverse,\'glyphicon-chevron-down\':!reverse}"></span></th>\n' +
        '<th class="pointer" ng-click="sort(\'status\')">Status<span class="glyphicon sort-icon" ng-show="sortKey==\'status\'" ng-class="{\'glyphicon-chevron-up\':reverse,\'glyphicon-chevron-down\':!reverse}"></span></th>\n' +
        '<th class="pointer" ng-click="sort(\'finishedDate\')">Date Finished<span class="glyphicon sort-icon" ng-show="sortKey==\'dinishedDate\'" ng-class="{\'glyphicon-chevron-up\':reverse,\'glyphicon-chevron-down\':!reverse}"></span></th>\n' +
        '<th class="pointer" ng-click="sort(\'modificationDate\')">Modification Date<span class="glyphicon sort-icon" ng-show="sortKey==\'modificationDate\'" ng-class="{\'glyphicon-chevron-up\':reverse,\'glyphicon-chevron-down\':!reverse}"></span></th>\n' +
        '<th class="pointer" ng-click="sort(\'creatioDate\')">Creation Date<span class="glyphicon sort-icon" ng-show="sortKey==\'creatioDate\'" ng-class="{\'glyphicon-chevron-up\':reverse,\'glyphicon-chevron-down\':!reverse}"></span></th>\n' +
        '<th>Option</th>\n' +
        '</tr>\n' +
        '<tr ng-repeat="task in tasks |orderBy:sortKey:reverse| filter: filterValueTasks ">\n' +
        '<td>{{ task.no }}</td>\n' +
        '<td>{{ task.deptNo }}</td>\n' +
        '<td>{{ task.title }}</td>\n' +
        '<td>{{ task.description }}</td>\n' +
        '<td>{{ task.status }}</td>\n' +
        '<td>{{ task.finishedDate }}</td>\n' +
        '<td>{{ task.modificationDate }}</td>\n' +
        '<td>{{ task.creatioDate }}</td>\n' +
        '<td>\n' +
        '<a href="javascript:" class="btn btn-danger btn-xs" ng-click="delete(task.no)">Delete</a>\n' +
        '<a href="javascript:" class="btn btn-primary btn-xs" ng-click="selectEdit(task.no)">Edit</a>\n' +
        '</td>\n' +
        '</tr>\n' +
        '</table>\n' +

        '<div>\n' +
        '<h4>Task Information</h4>\n' +
        '<form action="" method="" class="form-horizontal">\n' +

        '<div class="form-group">\n' +
        '<label for="no" class="col-sm-2">Number</label>\n'+
        '<div class="col-sm-8">\n'+
        '<input disabled class= "form-control" ng-model="no" id:"number"/>\n' +
        '</div>\n'+
        '</div>\n' +

        '<div class="form-group">\n' +
        '<label for="deptNo" class="col-sm-2">Department Number</label>\n'+
        '<div class="col-sm-8">\n'+
        '<select class= "form-control" ng-options="x for x in depNames" ng-model="deptNo" id:"deptNo"/></select>\n' +
        '</div>\n'+
        '</div>\n' +

        '<div class="form-group">\n' +
        '<label for="title" class="col-sm-2">Title</label>\n'+
        '<div class="col-sm-8">\n'+
        '<input class= "form-control" ng-model="title" id:"title"/>\n' +
        '</div>\n'+
        '</div>\n' +

        '<div class="form-group">\n' +
        '<label for="description" class="col-sm-2">Description</label>\n'+
        '<div class="col-sm-8">\n'+
        '<input class= "form-control" ng-model="description" id:"description"/>\n' +
        '</div>\n'+
        '</div>\n' +

        '<div class="form-group">\n' +
        '<label for="status" class="col-sm-2">Status</label>\n'+
        '<div class="col-sm-8">\n'+
        '<select class= "form-control" ng-options="x for x in statuses" ng-model="status" id:"status"/></select>\n' +
        '</div>\n'+
        '</div>\n' +

        '<div class="form-group">\n' +
        '<label for="finishedDate" class="col-sm-2">Date Finished</label>\n'+
        '<div class="col-sm-8">\n'+
        '<input class= "form-control" ng-model="finishedDate" id:"finishedDate"/>\n' +
        '</div>\n'+
        '</div>\n' +

        '<div class="form-group">\n' +
        '<label for="modificationDate" class="col-sm-2">Modification Date</label>\n'+
        '<div class="col-sm-8">\n'+
        '<input class= "form-control" ng-model="modificationDate" id:"modificationDate"/>\n' +
        '</div>\n'+
        '</div>\n' +

        '<div class="form-group">\n' +
        '<label for="creatioDate" class="col-sm-2">Creation Date</label>\n'+
        '<div class="col-sm-8">\n'+
        '<input class= "form-control" ng-model="creatioDate" id:"creatioDate"/>\n' +
        '</div>\n'+
        '</div>\n' +

        '<div class="col-sm-8 col-sm-push-2">\n'+
        '<button class="btn btn-success" ng-click="add()">Add</button>\n' +
        '<button class="btn btn-primary" ng-click="edit()">Save</button>\n' +
        '</div>\n'+

        '</form>\n' +
        '</div>'
    }
})

.directive('tasksLessDirective', function(){
    return{
        template:
                    '<h4>Tasks information</h4>\n' +
                    '<div>\n' +
                    'search tasks:\n' +
                    '</div>\n' +
                    '<div>\n' +
                    '<input ng-model="filterValueTasks"/>\n' +
                    '</div>\n' +
                    '&nbsp\n' +
                    '<table class="table table-bordered">\n' +
                        '<tr>\n' +
                    '<th>Task Number</th>\n' +
                    '<th>Department Number</th>\n' +
                    '<th>Title</th>\n' +
                    '<th>Description</th>\n' +
                    '<th>Status</th>\n' +
                    '<th>Date Finished</th>\n' +
                    '<th>Modification Date</th>\n' +
                    '<th>Creation Date</th>\n' +
                        '</tr>\n' +
                        '<tr ng-repeat="task in newTask | filter: filterValueTasks">\n' +
                    '<td>{{ task.no }}</td>\n' +
                    '<td>{{ task.deptNo }}</td>\n' +
                    '<td>{{ task.title }}</td>\n' +
                    '<td>{{ task.description }}</td>\n' +
                    '<td>{{ task.status }}</td>\n' +
                    '<td>{{ task.finishedDate }}</td>\n' +
                    '<td>{{ task.modificationDate }}</td>\n' +
                    '<td>{{ task.creatioDate }}</td>\n' +
                        '</tr>\n' +
                    '</table>'
    }
});
