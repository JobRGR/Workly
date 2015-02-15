'use strict';

var adminControllers = angular.module('adminControllers', []);

adminControllers.controller('mainCtrl', ['$scope',
    function ($scope) {
        $scope.type = "user";
    }]);

adminControllers.controller('navCtrl', ['$scope',
    function ($scope) {
        $scope.navModelItems = [
            {
                data: 'user',
                text: 'Users',
                active: true
            },
            {
                data: 'company',
                text: 'Companies',
                active: false
            },
            {
                data: 'post',
                text: 'Posts',
                active: false
            }
        ];

        $scope.index = 0;

        $scope.changeModel = function ($event, $index){
            var model = $scope.navModelItems[$index];
            $scope.type = model.data;
            $scope.navModelItems[$scope.index].active = false;
            $scope.navModelItems[$index].active = true;
            $scope.index = $index;
        }
    }]);

