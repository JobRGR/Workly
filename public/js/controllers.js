'use strict';

/* Controllers */

var worklyControllers = angular.module('worklyControllers', []);
var companyPageControllers = angular.module('companyPageControllers', []);
var headerControllers = angular.module('headerControllers', []);
var feedControllers = angular.module('feedControllers', []);

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
		console.log(feed);
	}]);