
worklyControllers.controller('myVacancyCtrl',['$scope', '$http', 'AuthService',
  function($scope, $http, AuthService){
    $scope.postList = [];

    $http.get('/api/get-my-posts').
      success(function(data, status, headers, config) {
        if(data.message == "ok") $scope.postList = data.posts
      }).error(function(data, status, headers, config) {
        console.log(arguments);
      });

    $scope.toPostPage = function (id) {
      document.location.pathname = '/post/' + id
    };

    $scope.getLog = function (src) {
      if (!src || !src.length) return '/images/logo-company.png'
      return src
    }

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