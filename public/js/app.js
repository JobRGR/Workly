"use strict";

var worklyApp = angular.module('worklyApp', [
	'ngCookies',
    'ngRoute',
    'worklyControllers',
    'companyPageControllers',
	'checkAuthControllers'
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
    'formFilling'
]).run(['$cookieStore', '$location', '$http', '$window',
    function($cookieStore, $location, $http, $window) {
		$cookieStore.redirectOut = function(){
            var redirectUrl = 'http://' + $window.location.host;
            $window.location.href = redirectUrl;
        };

        $http.get('/api/get-status')
            .success(function(resp) {
                if (resp.message != 'No Authorized Account')
				{
					if (resp.user != undefined)
						$cookieStore.put("user",resp.user);
					if (resp.company != undefined)
						$cookieStore.put("company",resp.company);
					$cookieStore.redirectOut();
				}

            })
            .error(function(err){
                console.log(err);
            });
    }]);

var editApp = angular.module('editApp', [
    'worklyControllers',
    'editControllers',
    'formFilling'
]).run(['$cookieStore', '$location', '$http', '$window',
    function($cookieStore, $location, $http, $window) {
		$cookieStore.redirectOut = function(){
            var redirectUrl = 'http://' + $window.location.host;
            $window.location.href = redirectUrl;
        }

        $http.get('/api/get-status')
            .success(function(resp) {
                if (resp.user != undefined)
					$cookieStore.put("user",resp.user);
                if (resp.company != undefined)
					$cookieStore.put("company",resp.company);
                if (resp.message != 'ok')
					$cookieStore.redirectOut();
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
                if (resp.company != undefined)
					$cookieStore.put("company",resp.company);
                else
					$cookieStore.redirectOut();
            })
            .error(function(err){
                console.log(err);
            });
    }]);

var feed = angular.module('feed', [
	'headerControllers',
	'feedControllers'
]);