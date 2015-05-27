'use strict';

/* Controllers */

var worklyControllers = angular.module('worklyControllers', []);
var renameControllers = angular.module('renameControllers', []);
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

renameControllers.controller('renameCtrl',['$scope',
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

renameControllers.controller('sliderCtrl',['$scope',"$sce",
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

renameControllers.controller('tipsCtrl',['$scope',
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
			var id = this.post._id;
			window.location.replace("/post/"+id);
		};

		$('input').keypress(function (e) {
			if (e.which == 13) {
				//alert($('input')[0].value);
				if ($($('#banner1')[0]).css('left') == "0px") {
					$http.post('/api/search-post', {query:$('input')[0].value}).
						success(function(data) {
							$scope.posts = data.posts;
						});
				}
				else  {
					$http.post('/api/search-user', {query:$('input')[0].value}).
						success(function(data) {
							$scope.posts = data.users;
						});
				}

				return false;    //<---- Add this line
			}
		});
	}]);