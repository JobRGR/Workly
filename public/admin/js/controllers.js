'use strict';

var adminControllers = angular.module('adminControllers', []);

adminControllers.controller('mainCtrl', ['$scope',
    function ($scope) {
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

adminControllers.controller('navCtrl', ['$scope',
    function ($scope) {
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
        }
    }]);

