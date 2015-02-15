'use strict';

var adminDirectives = angular.module('adminDirectives', []);

adminDirectives.directive("header", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/header.html"
    };
});

adminDirectives.directive("selectmodel", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/select-models.html",
        controller: 'navCtrl'
    };
});

adminDirectives.directive("modellist", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/model-list.html",
        controller: 'mainCtrl'
    };
});