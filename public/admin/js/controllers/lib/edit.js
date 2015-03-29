'use strict';

/*Edit Controllers*/

adminControllers.controller('editCtrl', ['$scope', '$http', '$rootScope',
  function ($scope, $http, $rootScope) {
    $scope.edit.notification = {
      status: false,
      text: "",
      type: 'success'
    };

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
          res[cur.name] = cur.value
          return res
        },{})
        , url = ($scope.editAdminTime() ? '/api/admin/edit/' : '/api/admin/edit-'+$rootScope.edit.type+'/')
          + $rootScope.edit.model['_id'];

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
    }
  }]);