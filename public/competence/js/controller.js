'use strict';

var competenceControllers = angular.module('competenceControllers', []);

competenceControllers.controller('mainCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $scope.searchQuery = '';
    $scope.dataObj = {};
    $http.get('/api/competence/get-list').
      success(function (data) {
        var dataList = JSON.parse(data.json).list;
        var dataObj = {};
        dataList.forEach(function (item){
          var key = item.title.toUpperCase()[0];
          if (!dataObj[key]) dataObj[key] = [];
          dataObj[key].push(item);
        })
        $scope.dataObj = dataObj;
      }).
      error(function (data) {
        console.log(data);
      });

    $scope.getHref = function (name) {
      var index = name.lastIndexOf('.');
      return name.substring(0, index)
    }
  }]);


competenceControllers.controller('itemCtrl', ['$scope', '$http', '$location',
  function ($scope, $http, $location) {

  }]);

competenceControllers.controller('headerCtrl', ['$scope', '$http',
  function ($scope, $http) {

  }]);