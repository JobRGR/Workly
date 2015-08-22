'use strict';


adminControllers.controller('testCtrl', ['$scope', '$http', '$rootScope',
  function ($scope, $http, $rootScope) {
    $scope.test = {current: 0}
    $scope.test.getTitles = function() {
      $http.get('/api/test/get-category')
        .success(function(data) {
          $scope.test.category = data.category.map(function (item, index) {
            item.active = index == $scope.test.current
            return item
          })
          $scope.test.getTests()
        })
        .error(function(err) {
          console.log(err)
        })
    }
    $scope.test.tmpCategory = {
      title: '',
      filename: '',
      index: undefined
    }
    $scope.test.addCategory = function() {
      $scope.test.isAddCategory = true
      $scope.test.tmpCategory = {
        title: '',
        filename: '',
        index: undefined
      }
    }
    $scope.test.closeAddCategory = function() {
      $scope.test.isAddCategory = false
    }
    $scope.test.saveCategory = function() {
      delete $scope.test.tmpCategory.index
      $scope.test.category.push($scope.test.tmpCategory)
      request('post','/api/test/add-category', $scope.test.tmpCategory)
    }
    $scope.test.editCategory = function(index) {
      $scope.test.isEditCategory = true
      $scope.test.tmpCategory = {
        title: $scope.test.category[index].title,
        filename: $scope.test.category[index].filename,
        index: index
      }
    }
    $scope.test.closeEditCategory = function() {
      $scope.test.isEditCategory = false
    }
    $scope.test.saveEditCategory = function() {
      var index = $scope.test.tmpCategory.index
      delete $scope.test.tmpCategory.index
      $scope.test.category[index] = $scope.test.tmpCategory
      request('post','/api/test/edit-category', $scope.test.tmpCategory)
    }
    $scope.test.removeCategory = function(index) {
      request('post','/api/test/remove-category', $scope.test.category[index])
      $scope.test.category.splice(index, 1)
    }

    $scope.test.getTests = function() {
      $http.post('/api/test/get-tests', $scope.test.category[$scope.test.current])
        .success(function(data) {
          $scope.test.tests = data.tests
        })
        .error(function(err) {
          console.log(err)
        })
    }

    $scope.test.changeCategory = function(index) {
      $scope.test.current = index
      $scope.test.getTests()
    }


    $scope.test.getTitles()

    function updateCategory() {
      request('post', '/api/test/update-category', $scope.test.tests)
    }

    function request(type, url, data, success, error) {
      $http[type](url, data)
        .success(function(data) {
          if (success) success(data)
          else console.log(data)
        })
        .error(function(err) {
          if (error) success(data)
          else console.log(err)
        })
    }
  }]);