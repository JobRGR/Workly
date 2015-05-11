'use strict';

/*CMS Controllers*/

adminControllers.controller('cmsCtrl', ['$scope', '$http', '$rootScope',
  function ($scope, $http, $rootScope) {
    $scope.cms = {};

    $scope.cms.notification = {
      status: false,
      text: "",
      type: 'success'
    };

    $scope.getNav = function (){
      if ($scope.cms.edit || $scope.cms.nav) return;
      $http.get('/api/admin/cms/nav').
        success(function (data, status, headers, config) {
          console.log(arguments);
          $scope.cms.nav = data.nav.map(function (item) {
            return {
              filename: item,
              active: false,
              title: item.split('.')[0].replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
            }
          });
          $scope.getText(0)
        }).
        error(function (data, status, headers, config) {
          console.log(arguments);
        });
    };

    $scope.getNav();

    $scope.getText = function($index){
      var data = {filename: ''};
      $scope.cms.nav.forEach(function(item, index){
        item.active = $index == index ? true : false;
        if($index == index) data.filename = item.filename;
      });

      $scope.cms.name = $scope.cms.nav[$index].title;
      $scope.cms.filename = $scope.cms.nav[$index].filename;

      $http.post('/api/admin/cms/get-file', data).
        success(function(data, status, headers, config) {
          console.log(arguments);
          try {
            $scope.cms.edit = JSON.parse(data.json);
          } catch(e){
            $scope.cms.edit = {};
          }
        }).
        error(function(data, status, headers, config) {
          console.log(arguments);
        });
    };

    $scope.checkArray = function(val){
      return val instanceof Array;
    };

    $scope.checkObject = function(val){
      return val instanceof Object;
    };

    $scope.printTitle = function(val){
      return val.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
    };

    $scope.sendData = function(){
      getCMSData($scope.cms.edit);

      var data = {
        data: $scope.cms.edit,
        filename: $scope.cms.filename
      };

      $http.post('/api/admin/cms/set-file', data).
        success(function(data, status, headers, config) {
          console.log(arguments);
          $scope.cms.notification = {
            status: true,
            text: data.message == "ok" ? 'Success save' : data.message,
            type: data.message == "ok" ? 'success' : 'info'
          };
        }).
        error(function(data, status, headers, config) {
          console.log(arguments);
          $scope.addNotification = {
            status: true,
            text: data.message == "ok" ? 'Success save' : data.message,
            type: data.message == "ok" ? 'success' : 'danger'
          };
        });
    };

    function getCMSData(obj) {
      for (var property in obj) {
        if (!obj.hasOwnProperty(property)) continue
        if (typeof obj[property] == "object") {
          getCMSData(obj[property])
        } else {
          var val = getCurData(obj[property]);
          obj[property] = val.length ? val : obj[property];
        }
      }
    }

    function getCurData(val) {
      var $input = $('.cms-input')
        , cur , isCur;

      for (var i = 0; i < $input.length; i++) {
        cur = $input.eq(i).attr('data-input');
        isCur = cur == val;
        if (isCur) {
          return $input.eq(i).val()
        }
      }
      return ""
    }

  }]);