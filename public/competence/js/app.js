'use strict';

var competenceApp = angular.module('competenceApp', [
  'ngRoute',
  'competenceControllers',
  'competenceDirectives'
]);

competenceApp.
  config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/', {
          templateUrl: "partials/main/index.html",
          controller: 'mainCtrl'
        }).
        when('/:item', {
          templateUrl: "partials/item/index.html",
          controller: 'itemCtrl'
        })
    }]).
  run([ '$rootScope', '$location', '$http',
    function ($rootScope, $location, $http) {}]);



