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
        });
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


competenceControllers.controller('itemCtrl', ['$scope', '$http', '$location', '$sce',
  function ($scope, $http, $location, $sce) {
    var url = '/api/competence/get-item';
    var name = $location.$$path.substring(1, $location.$$path.length) + '.json';
    $scope.dataObj = {};
    $scope.styleBg = {'background-image': 'url("/images/books.jpg")'};

    $http.post(url, {name: name}).
      success(function (data, status, headers, config) {
        $scope.dataObj = JSON.parse(data.json);
        if ($scope.isData('img'))
          $scope.styleBg['background-image'] = 'url('+$scope.dataObj.img+')'
      }).
      error(function (data) {
        $location.path('/');
      });

    $scope.isData = function (key) {
      return $scope.dataObj[key] && $scope.dataObj[key].length
    }

    $scope.deliberatelyTrustDangerousSnippet = function(key) {
      return $sce.trustAsHtml($scope.dataObj[key]);
    };
  }]);

competenceControllers.controller('headerCtrl', ['$scope', '$http', '$location',
  function ($scope, $http, $location) {
    $scope.isBack = function () {
      return $location.$$path != '/'
    }
  }]);