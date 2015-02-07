'use strict';

var adminControllers = angular.module('adminControllers', []);

adminControllers.controller('mainCtrl', ['$scope',
    function ($scope) {
        $scope.user = "Alex";
    }]);


