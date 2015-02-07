'use strict';

var adminApp = angular.module('adminApp', [
    'ngRoute',
    'adminDirectives',
    'adminControllers'
]);

adminApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: "partials/main.html",
                controller: 'mainCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);



