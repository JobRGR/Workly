'use strict';

/* Controllers */

var worklyControllers = angular.module('worklyControllers', []);
var companyPageControllers = angular.module('companyPageControllers', []);

worklyControllers.controller('TemplateCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.get('/json/templatesUrl.json')
            .success(function(data) {
                $scope.templatesUrl = data;
            })
            .error(function(err){
                console.log(err);
            });
    }]);

companyPageControllers.controller('companyPageProfileCtrl', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        var id = $routeParams.companyId;
        $http.get("/api/company/"+id)
            .success(function (resp, status) {
				console.log(status);
                $scope.vacancies = resp.company.vacancies;
				$scope.img = resp.company.img;
                $scope.companyName = resp.company.companyName;
                $scope.contacts = resp.company.contacts;
                $scope.mail = resp.company.mail;
                $scope.tel = resp.company.tel;
                $scope.website = resp.company.website;
                $scope.about = resp.company.about;



				if (!$scope.img) $scope.img = "standartImg.png";
            })
            .error(function (err) {
                console.log(err);
            });
    }]);

companyPageControllers.controller('companyPageVacLoadingCtrl', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams){
        $http.get("/api/post/"+$scope.id)
            .success(function (resp) {
                $scope.authorName = resp.post.authorName;
                $scope.city = resp.post.city;
                $scope.date = resp.post.date;
                $scope.companyId = $routeParams.companyId;
            })
            .error(function (err) {
                console.log(err);
            });
    }]);


companyPageControllers.controller('companyPageFollowCtrl', ['$scope', '$http', '$routeParams',
	function($scope, $http, $routeParams){
		$http.get("/api/post/"+$scope.id)
			.success(function (resp) {
				$scope.authorName = resp.post.authorName;
				$scope.city = resp.post.city;
				$scope.date = resp.post.date;
				$scope.companyId = $routeParams.companyId;
			})
			.error(function (err) {
				console.log(err);
			});
	}]);


