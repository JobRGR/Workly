var headerControllers = angular.module('headerControllers', []);

headerControllers.controller('HeaderCtrl',['$scope', '$http', 'AuthService',
    function($scope, $http, AuthService){
        var credentials = AuthService.getCredentials();
        $scope.clientList = [];
        $scope.vacancyList = [];

        if (credentials != undefined)
            $scope.client = credentials;

        $scope.showLoginForm = function(){
            $login = $('.login-back');
            $login.css({'opacity': 0, 'display':'block'});
            $login.animate({'opacity': 1}, 300);
        };

        $scope.logOut = function(){
            $http.post('/api/logout')
                .success(function(data){
                    if(data.message != 'ok') return;
                    AuthService.clearCredentials();
                    AuthService.refresh();
                })
                .error(function(err){
                    console.log(err);
                });
        }

        $http.get('/json/texts/header.json')
            .success(function(data) {
                if ($scope.client) {
                    $scope.clientList = data[$scope.client.role].clientList;
                    $scope.vacancyList = data[$scope.client.role].vacancyList;
                }
            })
            .error(function(err){
                console.log(err);
            });
    }]);

headerControllers.controller('loginCtrl',['$scope', '$http', 'AuthService',
    function($scope, $http, AuthService){
        $scope.passport= {};
        $scope.formBadMsg = 'Неправильно введені пошта або пароль';

        $scope.hideLoginForm = function(){
            $('.login-back').animate({'opacity': 0}, 300,function(){
                $(this).css('display', 'none');
            });
        };

        $scope.showError = function(){
            $formError = $('.form-error');
            if ($formError.css('display') != 'none') return;

            $formError.css({'display': 'block', 'opacity': 1});
            $formError.animate({'opacity': 0}, 3000, function () {
                $formError.css('display', 'none');
            });
        };

        $scope.logIn = function(){
            $http.post('/api/sign-in', $scope.passport)
                .success(function(data){
                    if(data.message != 'ok') {
                        $scope.showError();
                        return;
                    }
                    AuthService.setCredentials(data);
                    AuthService.refresh();
                })
                .error(function(err){
                    console.log(err);
                });
        };

    }]);

$(document).on('ready',function(){
    $(window).scroll(function(){
        var $header = $('.header');
        var imgs = $('.menu').find('img');
        var top = $(window).scrollTop();
        var hColor = $header.css('background-color');
        var nColor = 'rgb(255, 255, 255)';
        if (top == 0){
            $header.css({
                'background-color': 'transparent',
                'color': 'rgb(255, 255, 255',
                'box-shadow': 'none'
            });
            $('.header__logo').css('opacity', 0);
            if ($(imgs[0]).attr('src').indexOf('-black') > -1) {
                var img0 = $(imgs[0]).attr('src').split('-black');
                $(imgs[0]).attr('src', img0[0] + img0[1]);
                var img1 = $(imgs[1]).attr('src').split('-black');
                $(imgs[1]).attr('src', img1[0] + img1[1]);
            }
            return;
        }
        if (hColor != nColor){
            $header.css({
                'background-color': nColor,
                'color': 'rgb( 86, 86, 86)',
                'box-shadow': '0.5px 0.866px 3px 0px rgb( 0, 0, 0 )'
            });
            $('.header__logo').css('opacity', 1);
            if ($(imgs[0]).attr('src').indexOf('-black') == -1) {
                var img0 = $(imgs[0]).attr('src').split('.png');
                $(imgs[0]).attr('src', img0[0] + '-black.png');
                var img1 = $(imgs[1]).attr('src').split('.png');
                $(imgs[1]).attr('src', img1[0] + '-black.png');
            }
        }
    });
});
