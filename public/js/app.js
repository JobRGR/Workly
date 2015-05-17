"use strict";

var worklyApp = angular.module('worklyApp', [
	'ngCookies',
    'ngRoute',
    'worklyControllers',
    'companyPageControllers',
	'AuthenticationService',
	'authControllers'
]);
var feed = angular.module('feed', [
	'headerControllers',
	'feedControllers',
	'AuthenticationService'
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
	'ngCookies',
    'signupControllers',
    'formFilling',
	'AuthenticationService'
]).run(['$cookieStore', '$location', '$http', '$window', 'AutService',
    function($cookieStore, $location, $http, $window, AutService) {
		$cookieStore.redirectOut = function(){
            var redirectUrl = 'http://' + $window.location.host;
            $window.location.href = redirectUrl;
        };

        $http.get('/api/get-status')
            .success(function(resp) {
				var client = resp.user!=undefined ? resp.user : resp.company;
				AutService.SetCredentials(client);
            })
            .error(function(err){
                console.log(err);
            });
    }]);

var editApp = angular.module('editApp', [
    'worklyControllers',
    'editControllers',
    'formFilling',
	'AuthenticationService'
]).run(['$cookieStore', '$location', '$http', '$window', 'AutService',
    function($cookieStore, $location, $http, $window, AutService) {
		$cookieStore.redirectOut = function(){
            var redirectUrl = 'http://' + $window.location.host;
            $window.location.href = redirectUrl;
        };

        $http.get('/api/get-status')
            .success(function(resp) {
				var client = resp.user!=undefined ? resp.user : resp.company;
				AutService.SetCredentials(client);
            })
            .error(function(err){
                console.log(err);
            });
    }]);

var createPostApp = angular.module('createPostApp', [
    'worklyControllers',
    'createPostControllers',
    'formFilling'
]).run(['$cookieStore', '$location', '$http', '$window',
    function($cookieStore, $location, $http, $window) {
		$cookieStore.redirectOut = function(){
            var redirectUrl = 'http://' + $window.location.host;
            $window.location.href = redirectUrl;
        };

        $http.get('/api/get-status')
            .success(function(resp) {
            })
            .error(function(err){
                console.log(err);
            });
    }]);