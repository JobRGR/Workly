'use strict';

/* Controllers */

worklyControllers.controller('postCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location){
    $scope.postObj = {};
    $scope.companyObj = {};
    $scope.companyPostsArr = [];
    var postUrl = '/api/post/' + $location.$$absUrl.split('post/')[1];
    function getCompany() {
      if (!$scope.postObj.authorId) return;
      var compnayUrl = '/api/company/' + $scope.postObj.authorId;
      $http.get(compnayUrl)
        .success(function(data) {
          if (data.company) {
            $scope.companyObj = data.company;
          }
          if (data.post) {
            $scope.companyPostsArr = data.post;
          }
          console.log(data)
        })
        .error(function(data) {
          console.log(data)
        });
    }
    $http.get(postUrl)
      .success(function(data) {
        if (data.post) {
          $scope.postObj = data.post;
          getCompany();
        }

      })
      .error(function(data) {
        console.log(data)
      });

    $scope.isPostData = function(key) {
      return $scope.postObj[key] && $scope.postObj[key].trim().length
    };

    $scope.getSrcCompany = function() {
      var patern = '/images/logo-company.png';
      return $scope.companyObj.img || patern
    };

    $scope.getDatePost = function (date) {
      var newDate = new Date(date);
      return strDate(newDate);
    };

    function strDate(date){
      var isCurMonth = date.getUTCFullYear() == (new Date()).getUTCFullYear()
          && date.getUTCMonth() == (new Date()).getUTCMonth()
        , isCurDay = date.getDate() == (new Date).getDate()
        , isYesterday = date.getDate() == (new Date).getDate() - 1;

      if (!isCurMonth) return date.toLocaleDateString();
      if (isCurDay) return 'Cьогодні '+ date.toLocaleTimeString();
      if (isYesterday) return 'Вчора '+date.toLocaleTimeString();
      return date.toLocaleDateString();
    }
  }]);