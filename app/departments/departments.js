'use strict';

var app = angular.module('myApp.departments', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/departments', {
        templateUrl: 'departments/departments.html',
        controller: 'departmentsCtrl'
    });
}])

// app.factory('departmentFactory', function(){
//     var obj = {};
//     obj.data = [
//         {id: 1, name: "Research", location: "room 2.40, floor2",  purpose: "Expand knowledge on a certain subject!", employees:[]},
//         {id: 2, name: "Testing", location: "room 2.41, floor2",  purpose: "Testing of prototypes!", employees:[]}
//     ];
//     return obj;
// });

app.service('departmentService',['$http', function($http){
    this.getDepartments = function(){
        return $http.get('http://i874156.iris.fhict.nl/WEB2/departments');
    };

}]);



app.controller('departmentsCtrl',['$scope','departmentService', function ($scope,  departmentService) {


    $scope.departments = [];
    departmentService.getDepartments()
        .then(function (response) {
            $scope.departments = response.data;
            console.log($scope.departments);
        }) ,
        function (error) {
            $scope.error = error;
        };

    $scope.add= function(){
        { var i = $scope.departments.length+1;
        if (i > 16){
            i=16;
            alert('Max amout of departments reached!')
        }
        else{if($scope.name === '' || $scope.code === '' ||$scope.name === undefined || $scope.code === undefined){
            alert('Please fill in all the fields')
        }
        else {
            var checker = true;
            for(var index = 0; index < $scope.departments.length; ++index){
                if($scope.departments[index].code === $scope.code || $scope.departments[index].name === $scope.name){
                    checker = false;
                }
            }
            if(checker === true) {
                $scope.departments.push({no: i, name: $scope.name, code: $scope.code
                });
                $scope.no = '';
                $scope.code = '';
                $scope.name = '';
            }
            else{
                alert('Department name or code already exists!')

            }
        }}
        }
    };
    $scope.delete = function(id){
        var result = confirm('Are you sure you want to delete this?');
        if (result === true){
            var index = getSelectedIndex(id);
            $scope.departments.splice(index, 1);
        }
    };
    $scope.selectEdit = function(id){
        var index = getSelectedIndex(id);
        var department = $scope.departments[index];
        $scope.no= department.no;
        $scope.code= department.code;
        $scope.name= department.name;
    };
    function getSelectedIndex(id){
        for(var i=0; i<$scope.departments.length; i++)
            if($scope.departments[i].no==id)
                return i;
        return -1;
    }
    $scope.edit = function(){
        var index = getSelectedIndex($scope.no);
        var department = $scope.departments[index];
        department.name= $scope.name;
        department.no= $scope.no;
        department.code= $scope.code;
        $scope.name="";
        $scope.no="";
        $scope.code="";
    };

    $scope.startingIndex = $scope.departments+1;
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
}]);

app.directive('departmentsDirective', function(){
    // return{
    //     template: '<body ng-controller="departmentsCtrl">\n' +
    //     '<h4>Departments list</h4>\n' +
    //     '<div>\n' +
    //     'search departments:\n' +
    //     '</div>\n' +
    //     '<div>\n' +
    //     '<input type="text" ng-model="filterValueDepartments"/>\n' +
    //     '</div>\n' +
    //     '&nbsp\n' +
    //     '<table class="table table-bordered">\n' +
    //     '<tr>\n' +
    //     '<th>Department Number</th>\n' +
    //     '<th>Department Code</th>\n' +
    //     '<th>Department Name</th>\n' +
    //     '<th>Option</th>\n' +
    //     '</tr>\n' +
    //     '<tr ng-repeat="department in departments">\n' +
    //     '<td>{{ department.no }}</td>\n' +
    //     '<td>{{ department.code }}</td>\n' +
    //     '<td>{{ department.name }}</td>\n' +
    //     '<td>\n' +
    //     '<a href="javascript:" ng-click="delete(department.no)">Delete</a>\n' +
    //     '<a href="javascript:" ng-click="selectEdit(department.no)">Edit</a>\n' +
    //     '</td>\n' +
    //     '</td>\n' +
    //     '</tr>\n' +
    //     '</table>\n' +
    //     '<h4>Department Creation</h4>\n' +
    //     '<table cellpadding="2" cellspacing="2">\n' +
    //     '<tr>\n' +
    //     '<td>Number</td>\n' +
    //     '<td><input type="text" data-ng-model="no" disabled></td>\n' +
    //     '</tr>\n' +
    //     '<td>Code</td>\n' +
    //     '<td><input type="text" data-ng-model="code"></td>\n' +
    //     '</tr>\n' +
    //     '<tr>\n' +
    //     '<td>Name</td>\n' +
    //     '<td><input type="text" data-ng-model="name"></td>\n' +
    //     '</tr>\n' +
    //     '<tr>\n' +
    //     '<td>&nbsp;</td>\n' +
    //     '<td>\n' +
    //     '<input class="button" type="button" value="Add" ng-click="add()">\n' +
    //     '<input class="button" type="button" value="Save" ng-click="edit()">\n' +
    //     '</td>\n' +
    //     '</tr>\n' +
    //     '</table>\n' +
    //     '</body>'
    // }
    return{
        template:
        '<h4>Departments List</h4>\n' +
        '<div>\n' +
        'search departments:\n' +
        '</div>\n' +
        '<div>\n' +
        '<input class="box" placeholder="Search departments..." ng-model="filterValueDepartments"/>\n' +
        '</div>\n' +
        '&nbsp\n' +
        '<h4>Sorting is done by clicking on the column name!</h4>\n' +
        '<table class="table table-bordered table-condensed">\n' +
        '<tr>\n' +
        '<th class="pointer" ng-click="sort(\'no\')" >Department Number<span class="glyphicon sort-icon" ng-show="sortKey==\'no\'" ng-class="{\'glyphicon-chevron-up\':reverse,\'glyphicon-chevron-down\':!reverse}"></span></th>\n' +
        '<th class="pointer" ng-click="sort(\'code\')" >Department Code<span class="glyphicon sort-icon" ng-show="sortKey==\'code\'" ng-class="{\'glyphicon-chevron-up\':reverse,\'glyphicon-chevron-down\':!reverse}"></th>\n' +
        '<th class="pointer" ng-click="sort(\'name\')">Department Name<span class="glyphicon sort-icon" ng-show="sortKey==\'name\'" ng-class="{\'glyphicon-chevron-up\':reverse,\'glyphicon-chevron-down\':!reverse}"></th>\n' +
        '<th>Option</th>\n' +
        '</tr>\n' +
        '<tr ng-repeat="department in departments |orderBy:sortKey:reverse | filter: filterValueDepartments">\n' +
        '<td>{{ department.no }}</td>\n' +
        '<td>{{ department.code }}</td>\n' +
        '<td>{{ department.name }}</td>\n' +
        '<td>\n' +
        '<a href="javascript:" class="btn btn-danger btn-xs" ng-click="delete(department.no)">Delete</a>\n' +
        '<a href="javascript:" class="btn btn-primary btn-xs" ng-click="selectEdit(department.no)">Edit</a>\n' +
        '</td>\n' +
        '</tr>\n' +
        '</table>\n' +

        '<div>\n' +
        '<h4>Department Information</h4>\n' +
        '<form action="" method="" class="form-horizontal">\n' +
        '<div class="form-group">\n' +
        '<label for="no" class="col-sm-2">Number</label>\n'+
        '<div class="col-sm-8">\n'+
        '<input class= "form-control" disabled ng-model="no" id:"no" />\n' +
        '</div>\n'+
        '</div>\n' +

        '<div class="form-group">\n' +
        '<label for="code" class="col-sm-2">Department Code</label>\n'+
        '<div class="col-sm-8">\n'+
        '<input class= "form-control" ng-model="code" id:"code"/>\n' +
        '</div>\n'+
        '</div>\n' +

        '<div class="form-group">\n' +
        '<label for="name" class="col-sm-2">Department Name</label>\n'+
        '<div class="col-sm-8">\n'+
        '<input class= "form-control" ng-model="name" id:"name"/>\n' +
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

    .directive('departmentsLessDirective', function(){
        return{
            template:
            '<h4>Departments List</h4>\n' +
            '<div>\n' +
            'search departments:\n' +
            '</div>\n' +
            '<div>\n' +
            '<input ng-model="filterValueDepartments"/>\n' +
            '</div>\n' +
            '&nbsp\n' +
            '<table class="table table-bordered table-condensed">\n' +
            '<tr>\n' +
            '<th>Department Number</th>\n' +
            '<th>Department Code</th>\n' +
            '<th>Department Name</th>\n' +
            '</tr>\n' +
            '<tr ng-repeat="department in newDeps | filter: filterValueDepartments">\n' +
            '<td>{{ department.no }}</td>\n' +
            '<td>{{ department.code }}</td>\n' +
            '<td>{{ department.name }}</td>\n' +
            '</tr>\n' +
            '</table>\n' +
            '</form>\n' +
            '</div>'
        }
    });
