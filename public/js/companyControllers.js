'use strict';

/* Controllers */

var companyPageControllers = angular.module('companyPageControllers', ['AuthenticationService']);

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
                $scope.img = resp.company.img || '/images/logo-company.png';
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

companyPageControllers.controller('companyPageFollowCtrl', ['$scope', '$http',
    function($scope, $http){
        $scope.text = "follow";
        console.log(3);
    }]);
