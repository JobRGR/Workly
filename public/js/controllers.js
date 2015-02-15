'use strict';

/* Controllers */

var worklyControllers = angular.module('worklyControllers', []);
var signupControllers = angular.module('signupControllers', []);

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

signupControllers.controller('SignupCtrl', ['$scope', '$http',
    function($scope, $http){
        var signup = this;

        this.isUser = true;
        this.isAdditional = false;
        this.isCongrats = false;

        this.formBadMsg = '';
        this.userExt={};
        this.userExt.work = [{}];
        this.userExt.study = [{}];

        this.erasePlace = function(arr, ind){
            arr.splice(ind, 1);
        };

        this.addPlace = function(arr){
            arr.push({});
        };

        this.companyReg = function(isValid){
            if (!isValid || this.company.password != this.repeatPassword){
                this.formBadMsg = 'Невірно заповнена форма даних!';
                return false;
            }

            $http.post("/api/sign-up-company", this.company)
                .success(function (resp) {
                    console.log(resp);
                    if (resp.message == 'ok') signup.isAdditional = true;
                    else signup.formBadMsg = 'Така пошта вже зареєстрована!';
                })
                .error(function (err) {
                    console.log(err);
                });
        };

        this.userReg = function(isValid){
            if (!isValid || this.user.password != this.repeatPassword) {
                this.formBadMsg = 'Невірно заповнена форма даних!';
                return false;
            }

            $http.post("/api/sign-up-user", this.user)
                .success(function (resp) {
                    console.log(resp);
                    if (resp.message == 'ok') signup.isAdditional = true;
                    else signup.formBadMsg = 'Така пошта вже зареєстрована!';
                })
                .error(function (err) {
                    console.log(err);
                });
        };

        this.companyComplete = function(){
            $http.post("/api/edit-company", this.companyExt)
                .success(function (resp) {
                    console.log(resp);
                    if(resp.message == 'ok') {
                        signup.isCongrats = true;
                        signup.isAdditional = false;
                    }
                })
                .error(function (err) {
                    console.log(err);
                });
        };

        this.userComplete = function(){
            $http.post("/api/edit-user", this.userExt)
                .success(function (resp) {
                    console.log(resp);
                    if(resp.message == 'ok') {
                        signup.isCongrats = true;
                        signup.isAdditional = false;
                    }
                })
                .error(function (err) {
                    console.log(err);
                });
        };

        $http.get('/json/texts/signup_profits.json')
            .success(function(data) {
                $scope.info = data;
            })
            .error(function(err){
                console.log(err);
            });
    }]);