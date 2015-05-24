'use strict';

var competenceApp = angular.module('competenceApp', [
  'ngRoute',
  'competenceControllers',
  'competenceDirectives',
  'hc.marked'
]);

competenceApp.
  config(['$routeProvider','markedProvider',
    function($routeProvider, markedProvider) {
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



