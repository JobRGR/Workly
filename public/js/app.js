"use strict";

angular.module('worklyApp', [
    'worklyControllers'
]);

var signupApp = angular.module('signupApp', [
    'worklyControllers',
    'signupControllers',
    'ngRoute'
]);

signupApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $locationProvider
            .html5Mode(false);
        $routeProvider
            .when('/user', {
                templateUrl: '/pages/partials/signup/user.html',
                controller: 'SignupCtrl'
            })
            .when('/user/details', {
                templateUrl: '/pages/partials/signup/user-details.html',
                controller: 'SignupCtrl'
            })
            .when('/user/congrats', {
                templateUrl: '/pages/partials/signup/user-congrats.html'
            })
            .when('/company', {
                templateUrl: '/pages/partials/signup/company.html',
                controller: 'SignupCtrl'
            })
            .when('/company/details', {
                templateUrl: '/pages/partials/signup/company-details.html',
                controller: 'SignupCtrl'
            })
            .when('/company/congrats', {
                templateUrl: '/pages/partials/signup/company-congrats.html',
                controller: 'SignupCtrl'
            })
            .otherwise({
                redirectTo: '/user'
            });
    }]);
