'use strict';

/*Model Controllers*/

adminControllers.controller('modelCtrl', ['$cookieStore','$scope', '$http', '$rootScope',
  function ($cookieStore, $scope, $http, $rootScope) {
    var url = '/api/get-'
      , add = $scope.type == "user" ? 'users' : $scope.type == "company" ? 'companies' : $scope.type == 'post' ? 'posts' : 'admins';

    $scope.dataObj = {
      message: "",
      data: []
    };

    $scope.query = "";

    $http.get(url+add).
      success(function(data, status, headers, config) {
        $scope.dataObj.data = $rootScope.dataObj = data[add] ? data[add] : [];
        $scope.dataObj.message = $scope.dataObj.data.length ? "ok" : "No Data";
      }).
      error(function(data, status, headers, config) {
        $scope.dataObj.message = "Request Error";
        $scope.dataObj.data = [];
      });

    $scope.isData = function(){
      return $scope.dataObj.data.length
    };

    $scope.deleteItem = function($event, $index){
      var id = $scope.dataObj.data[$index]._id
        , url =  ($scope.isAdmin() ? '/api/admin/remove-admin/' : '/api/remove-' + $scope.type + '/')
          + id;

      $scope.dataObj.data.splice($index,1);
      if(!$scope.dataObj.data.length)
        $scope.dataObj.message = "No Data";

      $http.get(url).
        success(function(data, status, headers, config) {
          console.log(arguments);
        }).
        error(function(data, status, headers, config) {
          console.log(arguments);
        });
    };

    $scope.editItem = function($event, $index){
      var model =  $scope.dataObj.data[$index]
        , id = $scope.dataObj.data[$index]._id
        , url = '/api/' + $scope.type + '/' + id;

      console.log(model);
      $rootScope.edit = {
        status: true,
        type: $scope.type,
        model: model,
        editModel: []
      };
    };

    $scope.authItem = function($event, $index){
      var id = $scope.dataObj.data[$index]._id
        , url =  '/api/admin/auth-' + $scope.type + '/' + id;

      $http.get(url).
        success(function(data, status, headers, config) {
          var client = {
            name: (
              $scope.type == 'user' ?
              data.user.firstname + ' ' + data.user.secondname :
              data.company.companyName
            ),
            id: data[$scope.type]._id,
            role: $scope.type
          };
          $cookieStore.put('client', client);
          console.log(arguments);
        }).
        error(function(data, status, headers, config) {
          console.log(arguments);
        });
    };

    $scope.addModel = function(){
      $rootScope.add = {
        status: true,
        type: $scope.type
      }
    };

    $scope.dropModel = function(){
      var url = url = $scope.isAdmin() ? '/api/admin/drop-admin' : '/api/drop-' + $scope.type;
      $scope.dataObj.data = [];
      $scope.dataObj.message = "No Data";

      $http.get(url).
        success(function(data, status, headers, config) {
          console.log(arguments);
        }).
        error(function(data, status, headers, config) {
          console.log(arguments);
        });
    };

    $scope.dropDB = function(){
      var url = '/api/drop-db';

      $scope.dataObj.data = [];
      $scope.dataObj.message = "No Data";

      $http.get(url).
        success(function(data, status, headers, config) {
          console.log(arguments);
        }).
        error(function(data, status, headers, config) {
          console.log(arguments);
        });
    };

    $scope.isSearch = function ($event){
      var isKey = $event.keyCode == 13;
      if(isKey) $scope.searchModel()
    };

    $scope.searchModel = function(){
      var url = '/api/search-' + $scope.type
        , add = $scope.type == "user" ? 'users' : $scope.type == "company" ? 'companies' : 'posts';

      $http.post(url, {query: $scope.query}).
        success(function(data, status, headers, config) {
          console.log(arguments);
          $scope.dataObj.data = data[add] ? data[add] : [];
          $scope.dataObj.message = $scope.dataObj.data.length ? "ok" : "No Data";
        }).
        error(function(data, status, headers, config) {
          console.log(arguments);
          $scope.dataObj.message = "Request Error";
          $scope.dataObj.data = [];
        });
    }
  }]);