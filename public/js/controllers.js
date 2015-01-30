'use strict';

/* Controllers */

var worklyControllers = angular.module('worklyControllers', []);
var signupControllers = angular.module('signupControllers', []);

worklyControllers.controller('TemplateCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.get('/json/templatesUrl.json',{cache: false}).success(function(data) {
            $scope.templatesUrl = data;
        });
    }]);

signupControllers.controller('SignupCtrl', ['$scope', '$http',
    function($scope, $http){
        $http.get('/json/signup_profits.json',{cache: false}).success(function(data) {
            $scope.info = data;
        });
    }]);