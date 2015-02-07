'use strict';

var adminDirectives = angular.module('adminDirectives', []);

adminDirectives.directive("header", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/header.html"
    };
});
