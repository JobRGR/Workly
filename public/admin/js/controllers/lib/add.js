'use strict';

/*Edit Controllers*/

adminControllers.controller('addCtrl', ['$scope', '$http', '$rootScope', '$timeout',
  function ($scope, $http, $rootScope, $timeout) {
    $scope.addNotification = {
      status: false,
      text: "",
      type: 'success'
    };

    $scope.getAddStatus = function(){
      return $rootScope.add ? $rootScope.add.status : false
    };

    $scope.closeAdd = function(){
      $rootScope.add.status = false;
    };

    $scope.addName = function(name){
      return name[0].toUpperCase() + name.slice(1,name.length)
    };


    $scope.isUserAdd = function(){
      return $rootScope.add.type == "user"
    };

    $scope.isCompanyAdd = function(){
      return $rootScope.add.type == "company"
    };

    $scope.isPostAdd = function(){
      return $rootScope.add.type == "post"
    };

    $scope.isAdminAdd = function(){
      return $rootScope.add.type == "admin"
    };

    $scope.addModel = getModel();

    function getModel(){
      var res = {};

      if(!$scope.getAddStatus()) return res;
      else if($scope.isUserAdd()) res = getUser();
      else if($scope.isCompanyAdd()) res = getCompany();
      else if($scope.isPostAdd()) res = getPost();
      else if($scope.isAdminAdd()) res = getAdmin();

      res.showNecessary = res.necessary ? (res.necessary.length ? true : false) : false;
      res.showOther = res.other ? (res.other.length ? true : false) : false;
      return res
    }

    $scope.addWorkItem = function(){
      $scope.addModel.work.push({
        job: "",
        company: "",
        start: "",
        end: "",
        description: ""
      })
    };

    $scope.addStudyItem = function(){
      $scope.addModel.study.push({
        university: "",
        direction: "",
        start: "",
        end: "",
        degree: ""
      })
    };

    $scope.delStudyItem = function($index){
      $scope.addModel.study.splice($index,1)
    };

    $scope.delWorkItem = function($index){
      $scope.addModel.work.splice($index,1)
    };

    $scope.addOpen = function(){
      $scope.addModel.open.push({
        correct: "",
        isChecked: false,
        question: ""
      })
    };

    $scope.addTest = function(){
      var add = {
        correct: "",
        answers: [],
        question: ""
      };
      add.check = add.answers.map(function(){return false});
      $scope.addModel.test.push(add);
    };

    $scope.delAnswer = function(item, $index){
      item.answers.splice($index,1);
      item.check.splice($index,1);
    };

    $scope.delOpenItem = function($index){
      $scope.addModel.open.splice($index,1)
    };

    $scope.delTestItem = function($index){
      $scope.addModel.test.splice($index,1)
    };

    $scope.addAnswer = function(item, $index){
      item.answers.push("");
      item.check.push(false);
    };


    function getUser(){
      var necessary = ["mail","password","firstname","secondname"]
        , other = ["dob","city","tel","about","skills"];

      return {
        necessary: getArrayVal(necessary),
        other: getArrayVal(other),
        study: [],
        work: []
      }
    }

    function getCompany(){
      var necessary = ["companyName","password","mail"]
        , other = ["contacts","tel","website","about"];

      return {
        necessary: getArrayVal(necessary),
        other: getArrayVal(other)
      }
    }

    function getPost(){
      var necessary = ["job","city","requirements","responsibilities","offer","about","tags"];

      return {
        necessary: getArrayVal(necessary),
        test: [],
        open: []
      }
    }

    function getAdmin(){
      var necessary = ["login","password"];

      return {
        necessary: getArrayVal(necessary)
      }
    }

    function getArrayVal(type){
      return type.map(function(name){
        return {
          name: name,
          val: name == "dob" ? new Date() : "",
          type: name == "dob" ? "date" : "text"
        }
      })
    }

  }]);