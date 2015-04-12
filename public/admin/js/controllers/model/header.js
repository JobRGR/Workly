'use strict';

/*Header Controllers*/

adminControllers.controller('headerCtrl', ['$scope', '$http', '$rootScope',
  function ($scope, $http, $rootScope) {
    $http.get('/api/admin/get-status').
      success(function(data, status, headers, config) {
        $scope.admin = data.admin;
      }).
      error(function(data, status, headers, config) {
        $scope.model = undefined;
      });

    $scope.logout = function(){
      $http.post('/api/admin/logout').
        success(function(data, status, headers, config) {
          $scope.admin = undefined;
          $rootScope.loggedAdmin = undefined;
        }).
        error(function(data, status, headers, config) {
        });
    }

  }]);