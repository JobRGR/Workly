"use strict";

var worklyApp = angular.module('worklyApp', [
	'ngCookies',
    'ngRoute',
    'headerControllers',
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
]);
signupApp.run(['$cookieStore', '$location', '$http', '$window', 'AuthService',
    function($cookieStore, $location, $http, $window, AuthService) {
        var isLogged = AuthService.isLogged();
        if (isLogged){
            AuthService.redirectOut();
            return;
        }
    }]);

var editApp = angular.module('editApp', [
    'worklyControllers',
    'editControllers',
    'formFilling',
    'ngCookies',
    'headerControllers',
	'AuthenticationService'
]);
editApp.run(['$rootScope', '$cookieStore', '$location', '$http', '$window', 'AuthService',
    function($rootScope, $cookieStore, $location, $http, $window, AuthService) {
        var isLogged = AuthService.isLogged();
        if (!isLogged){
            AuthService.redirectOut();
            return;
        }

        $http.get('/api/get-status')
            .success(function(resp) {
                if (resp.user != undefined)
                    $rootScope.user = resp.user;
                else
                    $rootScope.company = resp.company;
            })
            .error(function(err){
                console.log(err);
            });
    }]);

var createPostApp = angular.module('createPostApp', [
    'worklyControllers',
    'createPostControllers',
    'headerControllers',
    'formFilling',
    'AuthenticationService',
    'ngCookies'
]);
createPostApp.run(['$cookieStore', '$location', '$http', '$window', 'AuthService',
    function($cookieStore, $location, $http, $window, AuthService) {
        var isLogged = AuthService.isLogged();
        if (!isLogged){
            AuthService.redirectOut();
            return;
        }

        var client = AuthService.getCredentials();
        if (client.role != 'company'){
            AuthService.redirectOut();
            return;
        }
    }]);