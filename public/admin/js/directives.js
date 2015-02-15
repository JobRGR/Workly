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

adminDirectives.directive("userslist", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/users-list.html",
        controller: 'modelCtrl'
    };
});

adminDirectives.directive("companieslist", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/companies-list.html",
        controller: 'modelCtrl'
    };
});

adminDirectives.directive("postslist", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/posts-list.html",
        controller: 'modelCtrl'
    };
});