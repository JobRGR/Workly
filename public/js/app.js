"use strict";

var worklyApp = angular.module('worklyApp', [
    'ngRoute',
    'worklyControllers',
    'companyPageControllers'
]);

worklyApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/company/:companyId', {
                templateUrl: 'partials/companyPage.html'
            }).
            otherwise({
                templateUrl: 'partials/landing.html' //edit render
            });
    }]);

var signupApp = angular.module('signupApp', [
    'worklyControllers',
    'signupControllers',
    'formFilling'
]);

var editApp = angular.module('editApp', [
    'worklyControllers',
    'editControllers',
    'formFilling'
]).run(['$rootScope', '$location', '$http', '$window',
    function($rootScope, $location, $http, $window) {
        $rootScope.redirectOut = function(){
            var redirectUrl = 'http://' + $window.location.host;
            $window.location.href = redirectUrl;
        }

        $http.get('/api/get-status')
            .success(function(resp) {
                if (resp.user != undefined)
                    $rootScope.user = resp.user;
                if (resp.company != undefined)
                    $rootScope.company = resp.company;
                if (resp.message != 'ok')
                    $rootScope.redirectOut();
            })
            .error(function(err){
                console.log(err);
            });
    }]);

var createPostApp = angular.module('createPostApp', [
    'worklyControllers',
    'createPostControllers',
    'formFilling'
]).run(['$rootScope', '$location', '$http', '$window',
    function($rootScope, $location, $http, $window) {
        $rootScope.redirectOut = function(){
            var redirectUrl = 'http://' + $window.location.host;
            $window.location.href = redirectUrl;
        };

        $http.get('/api/get-status')
            .success(function(resp) {
                if (resp.company != undefined)
                    $rootScope.company = resp.company;
                else
                    $rootScope.redirectOut();
            })
            .error(function(err){
                console.log(err);
            });
    }]);