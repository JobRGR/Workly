'use strict';


adminControllers.controller('competenceCtrl', ['$scope', '$http', '$rootScope',
  function ($scope, $http, $rootScope) {
    var url = '/api/competence/get-list';
    $scope.dataList = [];
    $scope.isAdd = false;
    $scope.isEdit = false;
    $scope.addNotification = {
      status: false,
      text: "",
      type: 'success'
    };
    $scope.addCompetenceModel = emptyCompetenceModel();

    function emptyCompetenceModel() {
      return {
        title: '',
        name: '',
        text: '',
        tags: '',
        img: ''
      }
    }

    $http.get(url).
      success(function (data, status, headers, config) {
        $scope.dataList = JSON.parse(data.json).list;
      }).
      error(function (data, status, headers, config) {
        console.log(data);
      });

    $scope.isData = function () {
      return $scope.dataList.length > 0
    };

    $scope.addCompetence = function (){
      $scope.addCompetenceModel = emptyCompetenceModel();
      $scope.isAdd = true;
    };

    $scope.closeAddCompetence = function () {
      $scope.addCompetenceModel = emptyCompetenceModel();
      $scope.isAdd = false;
    };

    $scope.editCompetence = function (name){
      var url = '/api/competence/get-item';
      $scope.isEdit = true;
      $http.post(url, {name: name}).
        success(function (data, status, headers, config) {
          $scope.addCompetenceModel = JSON.parse(data.json);
        }).
        error(function (data, status, headers, config) {
          console.log(data);
        });
    };

    $scope.closeEditCompetence = function () {
      $scope.addCompetenceModel = emptyCompetenceModel();
      $scope.isEdit = false;
    };

    $scope.sendAddCompetence = function () {
      $scope.dataList.push({
        title: $scope.addCompetenceModel.title,
        name: $scope.addCompetenceModel.name
      });
      setData({
        data: $scope.addCompetenceModel,
        url: '/api/competence/set-item'
      });
      setData({
        data: {list: $scope.dataList},
        url: '/api/competence/set-list'
      });
    };

    $scope.sendEditCompetence = function () {
      $scope.dataList.forEach(function(item){
        var isName = item.name == $scope.addCompetenceModel.name;
        if (isName) item.title = $scope.addCompetenceModel.title
      });

      setData({
        data: $scope.addCompetenceModel,
        url: '/api/competence/set-item'
      });
      saveList();
    };

    $scope.removeCompetence = function ($index) {
      var name = $scope.dataList[$index].name;
      $scope.dataList.splice($index, 1);
      setData({
        data: {'name': name},
        url: '/api/competence/remove-item'
      });
      saveList();
    };

    $scope.dropCompetence = function () {
      $scope.dataList = [];
      $http.get('/api/competence/drop').
        success(function (data, status, headers, config) {
          $scope.dataList = JSON.parse(data.json).list;
        }).
        error(function (data, status, headers, config) {
          console.log(data);
        });
    }

    function saveList() {
      setData({
        data: {list: $scope.dataList},
        url: '/api/competence/set-list'
      });
    }

    function setData(send) {
      $http.post(send.url, send.data).
        success(function (data, status, headers, config) {
          console.log(data);
        }).
        error(function (data, status, headers, config) {
          console.log(data);
        });
    }
   }]);