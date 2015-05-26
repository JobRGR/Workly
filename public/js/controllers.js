'use strict';

/* Controllers */

var worklyControllers = angular.module('worklyControllers', []);
var companyPageControllers = angular.module('companyPageControllers', ['AuthenticationService']);
var headerControllers = angular.module('headerControllers', []);
var feedControllers = angular.module('feedControllers', ['AuthenticationService']);
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

companyPageControllers.controller('companyPageProfileCtrl', ['$scope', '$http', '$location','AuthService',
    function($scope, $http, $location, AuthService) {
        var id = $location.$$absUrl.split('company/')[1];
		$('.compamyPage_info-card_profile-button').click(function() {
			$http.get("/api/subscribe/"+id)
				.success(function(){
					$scope.followText = "Ви вже підписані";
				})
				.error(function(err){
					console.log(err);
					$scope.followText = "Сталась помилка";
				});
		});

        $http.get("/api/company/"+id)
            .success(function (resp, status) {
                $scope.vacancies = resp.company.vacancies;
				$scope.img = resp.company.img;
                $scope.companyName = resp.company.companyName;
                $scope.contacts = resp.company.contacts;
                $scope.mail = resp.company.mail;
                $scope.tel = resp.company.tel;
                $scope.website = resp.company.website;
                $scope.about = resp.company.about;
				if (!$scope.img) $scope.img = "standartImg.png";

				var client = AuthService.getCredentials();
				var data = {
					query: client.name
				};
				var url = "/api/search-" + client.role;
				$scope.followText = "Підписатись";
				$http.post(url,data)
					.success(function (res){
						$scope.showFollowButton = (resp.company.subscribe.indexOf(client.id) > -1);
						resp.company.subscribe.every(function(element) {
							if (element!=null && element == client.id)
							{
								$scope.followText = "Ви вже підписані";
								return false;
							}
							return true;
						});
					})
					.error(function (err) {
						console.log(err);
					});
			})
            .error(function (err) {
                console.log(err);
            });
    }]);

companyPageControllers.controller('companyPageVacLoadingCtrl', ['$scope', '$http', '$location',
    function($scope, $http, $location){
        $http.get("/api/post/"+$scope.id)
            .success(function (resp) {
                $scope.authorName = resp.post.authorName;
                $scope.city = resp.post.city;
                $scope.date = resp.post.date;
                $scope.companyId =  $location.$$absUrl.split('company/')[1];;
            })
            .error(function (err) {
                console.log(err);
            });
    }]);

headerControllers.controller('headerCtrl',['$scope',
	function($scope){
		var hidden = true;
		window.addEventListener("scroll",function() {
			if(window.scrollY > 351 && hidden) {
				hidden = false;
				$('.feedPage_headerHidden').animate({
					marginTop: "+=35px"
				},300);
			}
			else
			if(window.scrollY <=351 && !hidden) {
				hidden = true;
				$('.feedPage_header_banner_nav_tip')[0].style.display = 'none';
				$('.feedPage_header_banner_nav_tip')[1].style.display = 'none';
				$scope.class = "feedPage_header_banner_nav_item";
				$('.feedPage_headerHidden').animate({
					marginTop: "-=35px"
				},300);

			}
		},false);
	}]);

headerControllers.controller('sliderCtrl',['$scope',"$sce",
	function($scope,$sce){
		var pos = 0;
		$scope.text = $sce.trustAsHtml("Знайди свою майбутню вакансію");

		$('#right').click(function(){
			if (!pos) {
				$('#banner2').animate({
					left: "-=100%"
				},500);
				$('#banner1').animate({
					left: "-=100%"
				},500);
				pos=1;
				$('.feedPage_searchBlock_slogan').fadeTo(250,0,function(){
					$scope.text = $sce.trustAsHtml("Знайди потрібного тобі спеціаліста");
					$scope.$apply();
					$('.feedPage_searchBlock_slogan').fadeTo(250,1);
				});
			}
		});

		$('#left').click(function(){
			if (pos){
				$('#banner2').animate({
					left: "+=100%"
				},500);
				$('#banner1').animate({
					left: "+=100%"
				},500);
				pos=0;
				$('.feedPage_searchBlock_slogan').fadeTo(250,0,function(){
					$scope.text = $sce.trustAsHtml("Знайди свою майбутню вакансію");
					$scope.$apply();
					$('.feedPage_searchBlock_slogan').fadeTo(250,1);
				});
			}
		});
	}]);

headerControllers.controller('tipsCtrl',['$scope',
	function($scope){
		$scope.showTip = function(a){
			($('.feedPage_header_banner_nav_tip')[a]).style.display = 'block';
			($('.feedPage_header_banner_nav_tip')[a]).focus();
			$scope.class = "NONfeedPage_header_banner_nav_item";
		};
		$scope.onBlur = function(a){
			$('.feedPage_header_banner_nav_tip')[a].style.display = 'none';
			$scope.class = "feedPage_header_banner_nav_item";
		}
	}]);

companyPageControllers.controller('companyPageFollowCtrl', ['$scope', '$http',
	function($scope, $http){
		$scope.text = "follow";
		console.log(3);
	}]);

feedControllers.controller('feedGeneration',['$scope', '$http',
	function($scope, $http){

		$http.get('/api/get-subscribe-posts')
			.success(function(res){
				$scope.posts = res.posts;
				$scope.posts.forEach(function(el){
					$http.get("/api/company/"+el.authorId)
						.success(function(resp){
							$scope.img = resp.company.img;
						});
				});
			});


		$scope.postClick = function(e) {
			if (e.target.localName == "a")
				return;
			var id = this.attributes[1].nodeValue;
			window.location.replace("/post");
		};
	}]);