'use strict';

angular.module('myApp.employees', ['ngRoute', 'ui.bootstrap', 'angularUtils.directives.dirPagination'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/employees', {
            templateUrl: 'employees/employees.html',
            controller: 'employeesCtrl'
        });
    }])

    .factory('employeesFactoryAlt', function () {
        var counter = 0;
        var helper = 0;
        var employees = [];


        return {
            getEmployees: function () {
                return employees;
            },

            delete: function (employee) {
                employee.splice(index, 1);
            },
            edit: function (employee, firstname,lastname,idnumber, depid, taskId, email){
                employee.firstname = firstname;
                employee.lastname = lastname;
                employee.idnumber=parseInt(idnumber, 10);
                employee.depid=parseInt(depid, 10);
                employee.taskId=parseInt(taskId, 10);
                employee.email=email;
                return employee;
            },
            add: function (firstname, lastname, idnumber, depid, taskId, email) {
                var employee = {
                    number: counter++,
                    firstname: firstname,
                    lastname: lastname,
                    idnumber: parseInt(idnumber, 10),
                    depid: parseInt(depid, 10),
                    taskId: parseInt(taskId, 10),
                    email: email
                };
                employees.push(employee);
            },
            populate: function () {
                if (helper === 0){
                    var employee1 = {
                        number: counter++,
                        firstname: "Dexter",
                        lastname: "Gibbs",
                        idnumber: 423123,
                        depid: 2,
                        taskId: 2,
                        email: "dextergibbs@hotmail.com"
                    };
                    var employee2 = {
                        number: counter++,
                        firstname: "Marian",
                        lastname: "Watts",
                        idnumber: 412345,
                        depid: 1,
                        taskId: 3,
                        email: "marianwatts@hotmail.com"
                    };
                    var employee3 = {
                        number: counter++,
                        firstname: "Lyle",
                        lastname: "Day",
                        idnumber: 563133,
                        depid: 2,
                        taskId: 1,
                        email: "lyleday@hotmail.com"
                    };
                    var employee4 = {
                        number: counter++,
                        firstname: "Sharon",
                        lastname: "Newman",
                        idnumber: 843632,
                        depid: 1,
                        taskId: 2,
                        email: "sharonnewman@hotmail.com"
                    };
                    var employee5 = {
                        number: counter++,
                        firstname: "Florence",
                        lastname: "Oliver",
                        idnumber: 626543,
                        depid: 1,
                        taskId: 3,
                        email: "florenceoliver@hotmail.com"
                    };
                    var employee6 = {
                        number: counter++,
                        firstname: "Kristin",
                        lastname: "Malone",
                        idnumber: 143156,
                        depid: 1,
                        taskId: 1,
                        email: "kristinmalone@hotmail.com"
                    };

                    employees.push(employee1);
                    employees.push(employee2);
                    employees.push(employee3);
                    employees.push(employee4);
                    employees.push(employee5);
                    employees.push(employee6);
                    helper++;
                }

            }
        };

    })
    //"no":10001,"birthDate":"1953-09-02","firstName":"Georgi","lastName":"Facello","gender":"M","hireDate":"1986-06-26"
    .service('employeesService', ['$http', function($http) {
        this.getEmployees = function(){
            return $http.get('http://i874156.iris.fhict.nl/WEB2/employees');
        };

    }])

    .controller('employeesCtrl',['$scope','employeesService', function($scope, employeesService) {

        $scope.employees = [];
        employeesService.getEmployees()
            .then(function (response) {
                $scope.employees = response.data;
            }) ,
            function (error) {
                $scope.error = error;
            };
        $scope.add = function() {

            if ( $scope.birthDate === undefined || $scope.firstName === undefined || $scope.lastName === undefined || $scope.gender === undefined || $scope.hireDate === undefined || $scope.birthDate === '' || $scope.firstName === '' || $scope.lastName === '' || $scope.gender === '' || $scope.hireDate === '' ) {
                alert('Please fill in all the fields')

            }
            else {
                if (checkForEmployeeId($scope.no)) {
                    alert('This id is already taken')
                }
                else {
                        var result = null;
                        for (var i = 0; i < $scope.employees.length; i++) {
                            var number = $scope.employees[i].no;
                            if (result == null || number > result) {
                                result = number;
                            }
                        }

                    $scope.maxEmpId = result + 1;
                    console.log($scope.maxEmpId );
                    $scope.employees.push({
                        no: $scope.maxEmpId,
                        birthDate: $scope.birthDate,
                        firstName: $scope.firstName,
                        lastName: $scope.lastName,
                        gender: $scope.gender,
                        hireDate: $scope.hireDate

                    });
                    $scope.no = '';
                    $scope.firstName = '';
                    $scope.birthDate = '';
                    $scope.lastName = '';
                    $scope.gender = '';
                    $scope.hireDate = '';
                }
            }
        };
        function checkForEmployeeId(id){
            var i;
            for(i=0; i < $scope.employees.length; i++){
                if ($scope.employees[i].no == id){
                    return true;
                }
            }
        }



        $scope.edit = function(){
            var index = getSelectedIndex($scope.no);
            var employee = $scope.employees[index];
            employee.firstName = $scope.firstName;
            employee.lastName = $scope.lastName;
            employee.no = $scope.no;
            employee.birthDate = $scope.birthDate;
            employee.gender = $scope.gender;
            employee.hireDate = $scope.hireDate;
        };
        $scope.selectEdit = function(id){
            var index = getSelectedIndex(id);
            var employee = $scope.employees[index];
            $scope.firstName= employee.firstName;
            $scope.lastName= employee.lastName;
            $scope.no= employee.no;
            $scope.hireDate= employee.hireDate;
            $scope.birthDate= employee.birthDate;
            $scope.gender= employee.gender;
        };
        $scope.delete = function(id){
            var result = confirm('Are you sure you want to delete this?');
            if (result === true){
                var index = getSelectedIndex(id);
                $scope.employees.splice(index, 1);
            }
        };
        function getSelectedIndex(id){
            for(var i=0; i<$scope.employees.length; i++)
                if($scope.employees[i].no===id)
                    return i;
            return -1;
        }
        $scope.sort = function(keyname){
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        }
        $scope.genders = ["M", "F"]
    }])

    .directive('employeesDirective', function(){
        return{
            template:
            '<h4>Employees List</h4>\n' +
            '<div>\n' +
            'search employees:\n' +
            '</div>\n' +
            '<div>\n' +
            '<input class="box" placeholder="Search employees..." ng-model="filterValueEmployees"/>\n' +
            '</div>\n' +
            '&nbsp\n' +
            '<h4>Sorting is done by clicking on the column name!</h4>\n' +
            '<table class="table table-bordered table-condensed">\n' +
            '<tr>\n' +
            '<th class="pointer" ng-click="sort(\'no\')" >Number<span class="glyphicon sort-icon" ng-show="sortKey==\'no\'" ng-class="{\'glyphicon-chevron-up\':reverse,\'glyphicon-chevron-down\':!reverse}"></span></th>\n' +
            '<th class="pointer" ng-click="sort(\'firstName\')" >First Name<span class="glyphicon sort-icon" ng-show="sortKey==\'firstName\'" ng-class="{\'glyphicon-chevron-up\':reverse,\'glyphicon-chevron-down\':!reverse}"></span></th>\n' +
            '<th class="pointer" ng-click="sort(\'lastName\')" >Last Name<span class="glyphicon sort-icon" ng-show="sortKey==\'lastName\'" ng-class="{\'glyphicon-chevron-up\':reverse,\'glyphicon-chevron-down\':!reverse}"></span></th>\n' +
            '<th class="pointer" ng-click="sort(\'birthDate\')" >Birth Date<span class="glyphicon sort-icon" ng-show="sortKey==\'birthDate\'" ng-class="{\'glyphicon-chevron-up\':reverse,\'glyphicon-chevron-down\':!reverse}"></span></th>\n' +
            '<th class="pointer" ng-click="sort(\'gender\')" >Gender<span class="glyphicon sort-icon" ng-show="sortKey==\'gender\'" ng-class="{\'glyphicon-chevron-up\':reverse,\'glyphicon-chevron-down\':!reverse}"></span></th>\n' +
            '<th class="pointer" ng-click="sort(\'hireDate\')" >Hire Date<span class="glyphicon sort-icon" ng-show="sortKey==\'hireDate\'" ng-class="{\'glyphicon-chevron-up\':reverse,\'glyphicon-chevron-down\':!reverse}"></span></th>\n' +
            '<th>Option</th>\n' +
            '</tr>\n' +
            '<tr dir-paginate="employee in employees | itemsPerPage: 5 |  filter: filterValueEmployees | orderBy:sortKey:reverse">\n' +
            '<td>{{ employee.no }}</td>\n' +
            '<td>{{ employee.firstName }}</td>\n' +
            '<td>{{ employee.lastName }}</td>\n' +
            '<td>{{ employee.birthDate }}</td>\n' +
            '<td>{{ employee.gender }}</td>\n' +
            '<td>{{ employee.hireDate }}</td>\n' +
            '<td>\n' +
            '<button class="btn btn-danger btn-xs" ng-click="delete(employee.no)">Delete</button>\n' +
            '<button class="btn btn-primary btn-xs" ng-click="selectEdit(employee.no)">Edit</button>\n' +
            '</td>\n' +
            '</tr>\n' +
            '</table>\n' +
            '<dir-pagination-controls max-size="5" direction-links="true" boundary-links="true" > </dir-pagination-controls>'+

            '<div">\n' +
            '<h4 id="EI">Employee Information</h4>\n' +
            '<form action="" method="" class="form-horizontal">\n' +
            '<div class="form-group">\n' +
            '<label for="no" class="col-sm-2">Number</label>\n'+
            '<div class="col-sm-8">\n'+
            '<input disabled class= "form-control" ng-model="no" id:"no"/>\n' +
            '</div>\n'+
            '</div>\n' +

            '<div class="form-group">\n' +
            '<label for="firstName" class="col-sm-2">First Name</label>\n'+
            '<div class="col-sm-8">\n'+
            '<input class= "form-control" ng-model="firstName" id:"firstname"/>\n' +
            '</div>\n'+
            '</div>\n' +

            '<div class="form-group">\n' +
            '<label for="lastName" class="col-sm-2">Last Name</label>\n'+
            '<div class="col-sm-8">\n'+
            '<input class= "form-control" ng-model="lastName" id:"lastName"/>\n' +
            '</div>\n'+
            '</div>\n' +

            '<div class="form-group">\n' +
            '<label for="birthDate" class="col-sm-2">Date of Birth</label>\n'+
            '<div class="col-sm-8">\n'+
            '<input class= "form-control" ng-model="birthDate" id:"birthDate"/>\n' +
            '</div>\n'+
            '</div>\n' +

            '<div class="form-group">\n' +
            '<label for="gender" class="col-sm-2">Gender</label>\n'+
            '<div class="col-sm-8">\n'+
            '<select class= "form-control" ng-options="x for x in genders" ng-model="gender" id:"gender"/></select>\n' +
            '</div>\n'+
            '</div>\n' +

            '<div class="form-group">\n' +
            '<label for="hireDate" class="col-sm-2">Hire Date</label>\n'+
            '<div class="col-sm-8">\n'+
            '<input class= "form-control" ng-model="hireDate" id:"hireDate"/>\n' +
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

    .directive('employeesLessDirective', function(){
        return {
            template:   '<h4>Employees List</h4>\n' +
            '<div>\n' +
            'search employees:\n' +
            '</div>\n' +
            '<div>\n' +
            '<input ng-model="filterValueEmployees"/>\n' +
            '</div>\n' +
            '&nbsp\n' +
            '<table class="table table-bordered">\n' +
            '<tr>\n' +
            '<th>Employee Number</th>\n'+
            '<th>Employee First Name</th>\n' +
            '<th>Employee Last Name</th>\n' +
            '<th>Employee Birth Date</th>\n' +
            '</tr>\n' +
            '<tr ng-repeat="employee in newEmp | filter: filterValueEmployees | limitTo: 5">\n' +
            '<td>{{ employee.no }}</td>\n' +
            '<td>{{ employee.firstName }}</td>\n' +
            '<td>{{ employee.lastName }}</td>\n' +
            '<td>{{ employee.birthDate }}</td>\n' +
            '</td>\n' +
            '</tr>\n' +
            '</table>'
        }
    });
