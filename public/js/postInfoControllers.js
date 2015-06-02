
worklyControllers.controller('postInfoCtrl',['$scope', '$http', '$location', 'AuthService',
  function($scope, $http, $location, AuthService){
    if (!AuthService.getCredentials()) return goIndex()
    var client =  AuthService.getCredentials()
      , isCompany = client.role == 'company'
      , id = $location.$$absUrl.split('post-info/')[1]
      , url = '/api/post/'+id;

    $scope.userList = [];
    $scope.postObj = {};
    $scope.currectUser = {};

    if (!isCompany) goIndex();
    $http.get(url).success(function(data){
      if (data.message != "ok") return goIndex();
      var post = data.post
        , isAuthor = post.authorId == client.id;
      if (!isAuthor) goIndex();
      $scope.postObj = post;
    });

    $http.get('/api/respond-post-list/'+id).success(function(data){
      if (data.message != "ok") return;
      $scope.userList = data.list;
      $scope.getItem(0);
    });

    $scope.checkImg = function(url){
      return url && url.length ? url : '/images/signup/user_logo.png'
    };

    $scope.getItem = function (index) {
      $scope.currectUser = $scope.userList[index];
      $scope.currectUser.index = index;
    };

    $scope.isGreen = function (ans, correct, index) {
      if (!$scope.currectUser.testQuestion) return;
      var res = ans == correct && ans ==$scope.currectUser.testAnswer[index];
      return res
    };

    $scope.isGreenOpen = function (correct, index) {
      if (!$scope.currectUser.openQuestion) return;
      var res = correct == $scope.currectUser.openAnswer[index];
      return res
    };

    $scope.isRedOpen = function (correct, index) {
      if (!$scope.currectUser.openQuestion) return;
      var res = correct != $scope.currectUser.openAnswer[index];
      return res
    };

    $scope.isRed = function (ans, correct, index) {
      if (!$scope.currectUser.testQuestion) return;
      var res = ans != correct && ans ==$scope.currectUser.testAnswer[index];
      return res
    };

    function goIndex(){
      return document.location.pathname = '/';
    }
  }]);