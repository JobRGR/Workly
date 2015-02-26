'use strict';

var adminDirectives = angular.module('adminDirectives', []);

adminDirectives.directive("header", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/header.html"
    };
});

adminDirectives.directive("selectModel", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/select-models.html",
        controller: 'navCtrl'
    };
});

adminDirectives.directive("modelList", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/model-list.html",
        controller: 'mainCtrl'
    };
});

adminDirectives.directive("usersList", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/users-list.html",
        controller: 'modelCtrl'
    };
});

adminDirectives.directive("companiesList", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/companies-list.html",
        controller: 'modelCtrl'
    };
});

adminDirectives.directive("postsList", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/posts-list.html",
        controller: 'modelCtrl'
    };
});

adminDirectives.directive("controlLine", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/control-line.html",
        controller: 'modelCtrl'
    };
});