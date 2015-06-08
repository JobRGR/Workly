var userControllers = angular.module('userControllers', []);

userControllers.controller('UserCtrl',['$scope', '$http', 'AuthService',
    function($scope, $http, AuthService){
        var client =  AuthService.getCredentials()
        if (!client) document.location.pathname = '/';
        $scope.postList = [];

        $scope.getDate = function (date) {
            return (new Date(date)).toLocaleDateString()
        };

        $scope.getDateFormat = function (date) {
            var newDate = new Date(date);
            return strDate(newDate);
        };

        function strDate(date){
            var isCurMonth = date.getUTCFullYear() == (new Date()).getUTCFullYear()
                    && date.getUTCMonth() == (new Date()).getUTCMonth()
                , isCurDay = date.getDate() == (new Date).getDate()
                , isYesterday = date.getDate() == (new Date).getDate() - 1;

            if (!isCurMonth) return date.toLocaleDateString();
            if (isCurDay) return 'Cьогодні '+ date.toLocaleTimeString();
            if (isYesterday) return 'Вчора '+date.toLocaleTimeString();
            return date.toLocaleDateString();
        }
    }]);