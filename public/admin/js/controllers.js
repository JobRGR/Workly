'use strict';

var adminControllers = angular.module('adminControllers', []);

adminControllers.controller('mainCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $scope.type = "user";

        $scope.isUser = function(){
            return $scope.type == "user"
        };

        $scope.isPost = function(){
            return $scope.type == "post"
        };

        $scope.isCompany = function(){
            return $scope.type == "company"
        };
    }]);

adminControllers.controller('navCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $scope.navModelItems = [
            {
                data: 'user',
                text: 'Users',
                active: true
            },
            {
                data: 'company',
                text: 'Companies',
                active: false
            },
            {
                data: 'post',
                text: 'Posts',
                active: false
            }
        ];

        $scope.index = 0;

        $scope.changeModel = function ($event, $index){
            var model = $scope.navModelItems[$index];
            $scope.type = model.data;
            $scope.navModelItems[$scope.index].active = false;
            $scope.navModelItems[$index].active = true;
            $scope.index = $index;
        };

    }]);

adminControllers.controller('modelCtrl', ['$scope', '$http',
    function ($scope, $http) {
        var url = '/api/get-'
          , add = $scope.type == "user" ? 'users' : $scope.type == "company" ? 'companies' : 'posts';

        $scope.dataObj = {
            message: "",
            data: []
        };

        $scope.query = "";

        $http.get(url+add).
          success(function(data, status, headers, config) {
              $scope.dataObj.data = data[add] ? data[add] : [];
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
              , url = '/api/remove-' + $scope.type + '/' + id;

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

        $scope.dropModel = function(){
            var url = url = '/api/drop-' + $scope.type;

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

