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
                templateUrl: "./admin/partials/main/main.html",
                controller: 'mainCtrl'
            }).
            when('/cms', {
              templateUrl: "./admin/partials/cms/cms.html",
              controller: 'cmsCtrl'
            }).
            when('/sign-in', {
              templateUrl: "./admin/partials/sign/sign.html",
              controller: 'mainCtrl'
            }).
            when('/sign-up', {
              templateUrl: "./admin/partials/sign/sign.html",
              controller: 'mainCtrl'
            }).
            when('/competence', {
              templateUrl: "./admin/partials/competence/competence.html",
              controller: 'competenceCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]).
  run([ '$rootScope', '$location', '$http',
    function($rootScope, $location, $http) {
      $rootScope.edit = {
        status: false,
        model: {},
        type: "",
        editModel: []
      };

      $http.get('/api/admin/get-status').
        success(function(data, status, headers, config) {
          console.log(arguments);
          if(data.admin) $rootScope.loggedAdmin = data.admin;
        }).
        error(function(data, status, headers, config) {
          console.log(arguments);
        });

      $rootScope.$watch(function(){
          if (!$rootScope.loggedAdmin) {
            var urlList = ['/', '/cms', '/competence']
              , curUrl = $location.path()
              , isList = urlList.indexOf(curUrl) > -1;

            if (isList) $location.path('/sign-in');
          } else {
            var urlList = ['/sign-in', '/sign-up']
              , curUrl = $location.path()
              , isList = urlList.indexOf(curUrl) > -1;

            if (isList) $location.path('/');
          }
      })
    }]);



