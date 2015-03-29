'use strict';

/*Nav Controllers*/

adminControllers.controller('navCtrl', ['$scope', '$http', '$rootScope',
  function ($scope, $http, $rootScope) {
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
      },
      {
        data: 'admin',
        text: 'Admins',
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

      $rootScope.edit = {
        status: false,
        type: "",
        model: {}
      };
    };

  }]);