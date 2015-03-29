'use strict';

/*Main Controllers*/

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

    $scope.isAdmin = function(){
      return $scope.type == "admin"
    }
  }]);