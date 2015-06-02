'use strict';

/* Controllers */

worklyControllers.controller('postCtrl', ['$scope', '$http', '$location', 'AuthService',
  function($scope, $http, $location, AuthService){
    var client =  AuthService.getCredentials();
    if (!client) document.location.pathname = '/';
    $scope.postObj = {};
    $scope.testQuestion = [];
    $scope.openQuestion = [];
    $scope.companyObj = {};
    $scope.companyPostsArr = [];
    $scope.respond = false;
    $scope.user = false;
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
          $scope.respond = data.respond || false;
          $scope.user = data.user || false;
          $scope.testQuestion = data.post.testQuestion
            .map(function(item){
              item.ans = undefined;
              return item;
            }) || [];
          $scope.openQuestion = data.post.openQuestion
            .map(function(item){
              item.ans = undefined;
              return item;
            }) || [];
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

    $scope.checkAns = function (textIndex, ansIndex){
      //console.log(textIndex, ansIndex);
      $scope.testQuestion[textIndex].ans = ansIndex;
    };

    $scope.respondPost = function () {
      var url = url = "/api/respond-post/" + $scope.postObj._id,
        data = {
          testQuestion: $scope.testQuestion.map(function(item){
            return {
              id: item._id,
              ans: item.answers[item.ans] || " "
            }
          }),
          openQuestion: $scope.openQuestion.map(function(item){
            return {
              id: item._id,
              ans: item.ans || " "
            }
          })
        };
      console.log(data);
      $http.post(url, data).
        success(function(data, status, headers, config) {
          console.log(arguments)
        }).
        error(function(data, status, headers, config) {
          console.log(arguments)
        });
      $scope.respond = true;
      $scope.user = true;
    };
  }]);