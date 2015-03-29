'use strict';

/*Edit Controllers*/

adminControllers.controller('editCtrl', ['$scope', '$http', '$rootScope',
  function ($scope, $http, $rootScope) {

    $rootScope.$watch(function(){
      var isLen = $rootScope.edit.editModel.length;
      if(isLen) return;

      //$scope.edit = {
      //  isEdit: $rootScope.edit ? $rootScope.edit.status : false,
      //  model: $rootScope.edit ? $rootScope.edit.model : {},
      //  type: $rootScope.edit ? $rootScope.edit.type : "",
      //  editModel: []
      //};

      if($scope.editUserTime()) editUserData();
      else if($scope.editPostTime()) editPostData();
      else if($scope.editCompanyTime()) editCompanyData();
    });

    function editUserData(){
      var type = ['firstname', 'secondname', 'city', 'tel', 'position','about', 'skills']
        , data = type.map(function(item){
            return {
              name: item,
              value: $rootScope.edit.model[item].trim()
            }
          });
      console.log(data);
      $rootScope.edit.editModel = data;
    }

    function editCompanyData(){
      var type = ['companyName', 'about', 'tel', 'website', 'website']
        , data = type.map(function(item){
          return {
            name: item,
            value: $rootScope.edit.model[item].trim()
          }
        });

      $rootScope.edit.editModel = data;
    }

    function editPostData(){
      var type = ['job', 'about', 'city', 'offer', 'requirements', 'tags']
        , data = type.map(function(item){
          return {
            name: item,
            value: $rootScope.edit.model[item].trim()
          }
        });

      $rootScope.edit.editModel = data;
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

    $scope.closeEdit = function(){
      $rootScope.edit = {
        status: false,
        model: {},
        type: "",
        editModel: []
      };
    };

    $scope.saveData = function(){
      console.log($rootScope.edit)
    }
  }]);