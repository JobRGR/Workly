'use strict';

/*Edit Controllers*/

adminControllers.controller('editCtrl', ['$scope', '$http', '$rootScope',
  function ($scope, $http, $rootScope) {
    $scope.edit.notification = {
      status: false,
      text: "",
      type: 'success'
    };

    $scope.edit.password = {
      password: "",
      confirm: ""
    };

    $scope.edit.mail = "";

    $rootScope.$watch(function(){
      var isLen = $rootScope.edit.editModel ?
        ($rootScope.edit.editModel.length ? true : false) : false;
      if(isLen) return;

      if($scope.editUserTime()) editUserData();
      else if($scope.editPostTime()) editPostData();
      else if($scope.editCompanyTime()) editCompanyData();
      else if($scope.editAdminTime()) editAdminData();
    });

    function editUserData(){
      var type = ['firstname', 'secondname', 'city', 'tel', 'position','about', 'skills'];
      $rootScope.edit.editModel = getData(type);
      $rootScope.edit.study = getObjVal('study');
      $rootScope.edit.work = getObjVal('work');
    }

    function editCompanyData(){
      var type = ['companyName', 'about', 'tel', 'website', 'website'];
      $rootScope.edit.editModel = getData(type);
    }

    function editPostData(){
      var type = ['job', 'about', 'city', 'offer', 'requirements', 'tags'];
      $rootScope.edit.editModel = getData(type);
    }

    function editAdminData(){
      var type = ['login','password'];
      $rootScope.edit.editModel = getData(type);
    }


    function getData(type){
      return type.map(function(item){
        return {
          name: item,
          value: $rootScope.edit.model[item] ? $rootScope.edit.model[item].trim() : ""
        }
      });
    }

    function getObjVal(type){
      return $rootScope.edit.model[type].map(function(item){
        delete item._id;
        return item
      })
    }

    $scope.addWork = function(){
      $rootScope.edit.work.push({
        job: "",
        company: "",
        start: "",
        end: "",
        description: ""
      })
    };

    $scope.addStudy = function(){
      $rootScope.edit.study.push({
        university: "",
        direction: "",
        start: "",
        end: "",
        degree: ""
      })
    };

    $scope.delStudy = function($index){
      $rootScope.edit.study.splice($index,1)
    };

    $scope.delWork = function($index){
      $rootScope.edit.work.splice($index,1)
    };

    $scope.editUserTime = function(){
      return $rootScope.edit.type  == 'user';
    };

    $scope.editCompanyTime = function(){
      return $rootScope.edit.type  == 'company';
    };

    $scope.editPostTime = function(){
      return $rootScope.edit.type  == 'post';
    };

    $scope.editAdminTime = function(){
      return $rootScope.edit.type  == 'admin';
    };

    $scope.closeEdit = function(){
      $rootScope.edit = {
        status: false,
        model: {},
        type: "",
        editModel: []
      };
    };

    $scope.saveData = function() {
      var data = $rootScope.edit.editModel.reduce(function (res, cur) {
          res[cur.name] = cur.value;
          return res
        },{})
        , url = ($scope.editAdminTime() ? '/api/admin/edit/' : '/api/admin/edit-'+$rootScope.edit.type+'/')
          + $rootScope.edit.model['_id'];

      if($scope.editUserTime()) {
        data.study = $rootScope.edit.study.filter(function (item) {
          return item.university.length || item.direction.length ||
            item.start.length || item.end.length || item.degree.length
        });

        data.work = $rootScope.edit.work.filter(function (item) {
          return item.job.length || item.company.length ||
            item.start.length || item.end.length || item.description.length
        });
      }

      for(var key in data)
        $rootScope.edit.model[key] = data[key];

      $http.post(url, data).
        success(function(data, status, headers, config) {
          console.log(arguments);
          $scope.edit.notification = {
            status: true,
            text: data.message == "ok" ? 'Success save' : data.message,
            type: data.message == "ok" ? 'success' : 'info'
          };
        }).
        error(function(data, status, headers, config) {
          console.log(arguments);
          $scope.edit.notification = {
            status: true,
            text: data.message == "ok" ? 'Success save' : data.message,
            type: data.message == "ok" ? 'success' : 'danger'
          };
        });
    };

    $scope.changePassword = function(){
      var isConfirm = $scope.edit.password.password == $scope.edit.password.confirm
          && $scope.edit.password.password.length
        , data = {password: $scope.edit.password.password}
        , url = '/api/admin/change-password-'+$rootScope.edit.type+'/' + $rootScope.edit.model['_id'];

      if(!isConfirm) return;
      $http.post(url, data).
        success(function(data, status, headers, config) {
          console.log(arguments);
        }).
        error(function(data, status, headers, config) {
          console.log(arguments);
        });
    };

    $scope.changeMail = function(){
      var data = {mail: $scope.edit.mail}
        , regex = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test($scope.edit.mail)
        , url = '/api/admin/change-mail-'+$rootScope.edit.type+'/' + $rootScope.edit.model['_id'];
      if(!regex) return;
      $rootScope.edit.model.mail =  $scope.edit.mail;
      $http.post(url, data).
        success(function(data, status, headers, config) {
          console.log(arguments);
        }).
        error(function(data, status, headers, config) {
          console.log(arguments);
        });
    }

  }]);