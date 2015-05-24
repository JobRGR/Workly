'use strict';

/* Controllers */

var worklyControllers = angular.module('worklyControllers', []);
var companyPageControllers = angular.module('companyPageControllers', []);
var feedControllers = angular.module('feedControllers', []);
var authControllers = angular.module('authControllers', ['AuthenticationService']);


authControllers.controller('isUserLoggedIn', ['$scope', 'AuthService',
	function($scope, AuthService) {
		$scope.logged = AuthService.isLogged;
	}]);

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
        //var id = $routeParams.companyId;
        //$http.get("/api/company/"+id)
        //    .success(function (resp, status) {
        //        $scope.vacancies = resp.company.vacancies;
			//	$scope.img = resp.company.img;
        //        $scope.companyName = resp.company.companyName;
        //        $scope.contacts = resp.company.contacts;
        //        $scope.mail = resp.company.mail;
        //        $scope.tel = resp.company.tel;
        //        $scope.website = resp.company.website;
        //        $scope.about = resp.company.about;
			//	if (!$scope.img) $scope.img = "standartImg.png";
        //    })
        //    .error(function (err) {
        //        console.log(err);
        //    });
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


companyPageControllers.controller('companyPageFollowCtrl', ['$scope', '$http',
	function($scope, $http){
		$scope.text = "follow";
		console.log(3);
	}]);

feedControllers.controller('linkCtrl',['$scope',
	function($scope){
		var feed = $('.feedPage_feed_feedBlock');
		feed.each(function(index){
			feed[index].onclick  = function(e){
				if( e.target.localName == "a" )
					return;
				var id = this.attributes[1].nodeValue;
				window.location.replace("/post");
			};
		});
	}]);