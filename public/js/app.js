"use strict";

var worklyApp = angular.module('worklyApp', [
	'ngCookies',
    'ngRoute',
    'headerControllers',
    'worklyControllers',
	'AuthenticationService',
	'authControllers'
]);

var feedApp = angular.module('feedApp', [
    'worklyControllers',
    'renameControllers',
	'feedControllers',
	'AuthenticationService',
	'ngCookies',
	'headerControllers'
]);

var userApp = angular.module('userApp',[
    'AuthenticationService',
    'ngCookies',
    'userControllers',
    'worklyControllers',
    'headerControllers'
]);
userApp.run(['$cookieStore', '$rootScope', '$location', '$http', '$window', 'AuthService',
    function($cookieStore, $rootScope, $location, $http, $window, AuthService) {
        var isLogged = AuthService.isLogged();
        if (!isLogged){
            AuthService.redirectOut();
            return;
        }

        //$http.get('/api/get-status')
        //  .success(function(resp){
        //      if(resp.message != 'ok'){
        //          AuthService.redirectOut();
        //          return;
        //      }
        //      $rootScope.user = resp.user || resp.company;
        //  })
        //  .error(function(err){
        //        //AuthService.redirectOut();
        //        console.log(err);
        //    });

        var href = $window.location.href.split('/');
        var id = href[href.length - 1];

        $http.get('/api/user/' + id)
            .success(function(resp){
                if(resp.message != 'ok'){
                    AuthService.redirectOut();
                    return;
                }
               $rootScope.user = resp.user;
            })
            .error(function(err){
                //AuthService.redirectOut();
                console.log(err);
            });
    }]);

var companyApp = angular.module('companyApp',[
    'AuthenticationService',
    'ngCookies',
    'companyPageControllers',
    'worklyControllers',
    'headerControllers'
]);
companyApp.run(['$cookieStore', '$rootScope', '$location', '$http', '$window', 'AuthService',
    function($cookieStore, $rootScope, $location, $http, $window, AuthService) {
        var isLogged = AuthService.isLogged();
        if (!isLogged){
            AuthService.redirectOut();
            return;
        }

        var href = $window.location.href.split('/');
        var id = href[href.length - 1];
        $http.get('/api/company/' + id)
            .success(function(resp){
                if(resp.message != 'ok'){
                    AuthService.redirectOut();
                    return;
                }
                $rootScope.company = resp.company;
            })
            .error(function(err){
                //AuthService.redirectOut();
                console.log(err);
            });
    }]);

worklyApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
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