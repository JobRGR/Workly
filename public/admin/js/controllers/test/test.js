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
    $scope.test.saveAddCategory = function() {
      delete $scope.test.tmpCategory.index
      if (!$scope.test.category.length) $scope.test.tmpCategory.active = true
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
      $scope.test.tmpCategory.active = true
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
          $scope.test.questions = data
        })
        .error(function(err) {
          console.log(err)
        })
    }

    $scope.test.changeCategory = function($index) {
      $scope.test.current = $index
      $scope.test.category.forEach(function (item, index) {
        item.active = index == $scope.test.current
      })
      $scope.test.getTests()
    }

    $scope.test.tmpTest = {
      question: '',
      correct: '',
      answers: [],
      index: undefined,
    }

    $scope.test.tmpOpen = {
      correct: '',
      question: '',
      isChecked: true,
      index: undefined,
    }

    $scope.test.addTest = function() {
      $scope.test.isAddTest = true
      $scope.test.tmpTest = {
        question: '',
        correct: '',
        answers: [],
        index: undefined,
      }
    }

    $scope.test.addOpen = function() {
      $scope.test.isAddOpen = true
      $scope.test.tmpOpen = {
        correct: '',
        question: '',
        isChecked: true,
        index: undefined,
      }
    }

    $scope.test.closeAddTest = function() {
      $scope.test.isAddTest = false
    }

    $scope.test.closeAddOpen = function() {
      $scope.test.isAddOpen = false
    }

    $scope.test.saveAddTest = function() {
      delete $scope.test.tmpTest.index
      $scope.test.questions.test.push($scope.test.tmpTest)
      updateCategory()
    }

    $scope.test.saveAddOpen = function() {
      delete $scope.test.tmpOpen.index
      $scope.test.questions.open.push($scope.test.tmpOpen)
      updateCategory()
    }


    $scope.test.editTest = function(index) {
      $scope.test.isEditTest = true
      $scope.test.tmpTest = {
        question: '',
        correct: '',
        answers: [],
        index: index,
      }
    }

    $scope.test.editOpen = function(index) {
      $scope.test.isEditOpen = true
      $scope.test.tmpOpen = {
        correct: '',
        question: '',
        isChecked: true,
        index: index,
      }
    }

    $scope.test.closeEditTest = function() {
      $scope.test.isEditTest = false
    }

    $scope.test.closeEditOpen = function() {
      $scope.test.isEditOpen = false
    }

    $scope.test.saveEditTest = function() {
      var index = $scope.test.tmpTest.index
      delete $scope.test.tmpTest.index
      $scope.test.questions.test[index] = $scope.test.tmpTest
      updateCategory()
    }

    $scope.test.saveEditOpen = function() {
      var index = $scope.test.tmpOpen.index
      delete $scope.test.tmpOpen.index
      $scope.test.questions.open[index] = $scope.test.tmpOpen
      updateCategory()
    }

    $scope.test.removeOpen = function (index) {
      $scope.test.question.open.splice(index, 1)
      updateCategory()
    }

    $scope.test.removeTest = function (index) {
      $scope.test.question.test.splice(index, 1)
      updateCategory()
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