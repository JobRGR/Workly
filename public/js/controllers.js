'use strict';

/* Controllers */

var worklyControllers = angular.module('worklyControllers', []);

worklyControllers.controller('TemplateCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.get('/json/templatesUrl.json',{cache: false}).success(function(data) {
            $scope.templatesUrl = data;
        });

        $scope.hello = "hello";
    }]);
