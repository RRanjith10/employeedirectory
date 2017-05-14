var myApp = angular.module('myApp', ['720kb.datepicker']);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {   

  $scope.title = "Employee Directory Application";
  $scope.currentDate = new Date();
  var updateView = function(){
    $http.get('/employeedirectory').then(function (response){
      $scope.employees = response.data; 
      $scope.employee = {
        name : '',
        email : '',
        dob : '',
        department : '',
        gender : '',
        age : ''
      };
    },function (error){
      console.log(error);
    });
  };

  updateView();
  
  $scope.addEmployee = function() {
    setAge();
    $http.post('/employeedirectory/employee', $scope.employee).then(function (response){
      updateView();
    },function (error){
      console.log(error);
    });
  };
  
  $scope.removeEmployee = function(id) {
    $http.delete('/employeedirectory/employee/' + id).then(function (response){
      updateView();
    },function (error){
      console.log(error);
    });
  };
  
  $scope.editEmployee = function(id) {
    console.log(id);
    $http.get('/employeedirectory/employee/' + id).then(function (response){
      $scope.employee = response.data;
      console.log($scope.employee);
    },function (error){
      console.log(error);
    });
 };
  
  $scope.updateEmployee = function() {
    setAge();
    $http.put('/employeedirectory/employee/' + $scope.employee._id, $scope.employee).then(function (response){
      updateView();
    },function (error){
      console.log(error);
    });
  };


  function setAge(){
    var dob = $scope.employee.DateofBirth;
    console.log(dob);
    var now = new Date();
    var bornDateTime = dob.split("T");
    var bornDate = bornDateTime[0]; 
    var birthdate = bornDate.split("-");
    var born = new Date(birthdate[0], birthdate[1]-1, birthdate[2]);
    age=get_age(born,now);
   
    console.log(birthdate[2]+" : "+birthdate[1]+" : "+birthdate[0]);
    $scope.employee.Age = age;
    console.log(age);
  }

  function get_age(born, now) {
    var birthday = new Date(now.getFullYear(), born.getMonth(), born.getDate());
    if (now >= birthday) 
    return now.getFullYear() - born.getFullYear();
    else
    return now.getFullYear() - born.getFullYear() - 1;
  }
    
}]);