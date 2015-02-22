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
