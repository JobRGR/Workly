'use strict';

var adminApp = angular.module('adminApp', [
    'ngRoute',
    'adminControllers',
    'adminDirectives'
]);

adminApp.
  config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: "partials/main/main.html",
                controller: 'mainCtrl'
            }).
            when('/sign-in', {
              templateUrl: "partials/sign/sign.html",
              controller: 'mainCtrl'
            }).
            when('/sign-up', {
              templateUrl: "partials/sign/sign.html",
              controller: 'mainCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]).
  run([ '$rootScope', '$location', '$http',
    function($rootScope, $location, $http) {
        $http.get('/api/admin/get-status').
            success(function(data, status, headers, config) {
              console.log(arguments);
              if(data.admin) $rootScope.loggedAdmin = data.admin;
            }).
            error(function(data, status, headers, config) {
              console.log(arguments);
            });

        $rootScope.$watch(function(){
          if(!$rootScope.loggedAdmin){
              var urlList = ['/']
                , curUrl = $location.path()
                , isList = urlList.indexOf(curUrl) > -1;

              if(isList) $location.path('/sign-in');
          } else {
            var urlList = ['/sign-in','/sign-up']
              , curUrl = $location.path()
              , isList = urlList.indexOf(curUrl) > -1;

            if(isList) $location.path('/');
          }
        })

    }]);



