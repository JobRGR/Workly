'use strict';

var competenceDirectives = angular.module('competenceDirectives', []);

competenceDirectives.directive("header", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/common/header.html",
        controller: 'headerCtrl'
    };
});

competenceDirectives.directive("search", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/main/search.html",
        controller: 'mainCtrl'
    };
});

competenceDirectives.directive("footer", function () {
    return {
        restrict: 'E',
        templateUrl: "../partials/footer.html"
    };
});