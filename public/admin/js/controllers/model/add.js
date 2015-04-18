'use strict';

/*Add Controllers*/

adminControllers.controller('addCtrl', ['$scope', '$http', '$rootScope', '$timeout',
  function ($scope, $http, $rootScope, $timeout) {
    $scope.addNotification = {
      status: false,
      text: "",
      type: 'success'
    };

    $scope.addNotificationComapny = {
      status: false,
      text: "Permission denied. Don't authorized by company.",
      type: 'danger'
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

    $scope.getCompanyStatus = function(){
      if(!$scope.getAddStatus()) return;
      if(!$scope.isPostAdd()) return;
      $http.get('/api/get-status').
        success(function(data, status, headers, config) {
          console.log(arguments);
          if(!data.company) $scope.addNotificationComapny.status = true
        }).
        error(function(data, status, headers, config) {
          console.log(arguments);
        });
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
    $scope.getCompanyStatus();

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
          type: name == "dob" ? "date" : name == "password" ? "password" : "text"
        }
      })
    }

    function getSendData(){
      if(!$scope.getAddStatus()) return {};
      if($scope.isUserAdd()) return getUserData();
      if($scope.isCompanyAdd()) return getCompanyData();
      if($scope.isPostAdd()) return getPostData();
      if($scope.isAdminAdd()) return getAdminData();
    }

    function getUserData(){
      var data  = {
        necessary: getNecessaryData(),
        other: getOtherData()
      };

      data.other.study = $scope.addModel.study.filter(function (item) {
        return item.university.length || item.direction.length ||
          item.start.length || item.end.length || item.degree.length
      });

      data.other.work = $scope.addModel.work.filter(function (item) {
        return item.job.length || item.company.length ||
          item.start.length || item.end.length || item.description.length
      });

      return data;
    }

    function getCompanyData(){
      return {
        necessary: getNecessaryData(),
        other: getOtherData()
      };
    }

    function getAdminData(){
      return getNecessaryData()
    }

    function getPostData(){
      var data = getNecessaryData();
      data.openQuestion = $scope.addModel.open.filter(function(item){
        return item.question.length || (item.correct.length && !item.isChecked)
      });

      data.testQuestion = $scope.addModel.test.filter(function(item){
        return item.question.length || (item.correct.length && !item.isChecked)
      });
    }

    function getNecessaryData(){
      return $scope.addModel.necessary.reduce(function (res, cur) {
        res[cur.name] = cur.value;
        return res
      },{});
    }

    function getOtherData(){
      return $scope.addModel.other.reduce(function (res, cur) {
        res[cur.name] = cur.value;
        return res
      },{});
    }

    $scope.sendAddData = function(){
      var data = getSendData()
        , url = '/api/admin/add-'+$rootScope.add.type+'/';

      $http.post(url, data).
        success(function(data, status, headers, config) {
          console.log(arguments);
          $rootScope.dataObj.push(data.user);
          $scope.addNotification = {
            status: true,
            text: data.message == "ok" ? 'Success save' : data.message,
            type: data.message == "ok" ? 'success' : 'info'
          };
        }).
        error(function(data, status, headers, config) {
          console.log(arguments);
          $scope.addNotification = {
            status: true,
            text: data.message == "ok" ? 'Success save' : data.message,
            type: data.message == "ok" ? 'success' : 'danger'
          };
        });
    }

  }]);