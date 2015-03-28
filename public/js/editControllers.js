'use strict';

var editControllers = angular.module('editControllers', ['ngAnimate']);

editControllers.controller('EditCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope){
        var edit = this;

        $rootScope.$watch(function() {
            edit.user = $rootScope.user;
            edit.company = $rootScope.company;
        });

        this.formBadMsg = '';
        this.mailBadMsg = '';
        this.passBadMsg = '';

        this.resetBadMsg = function(){
            this.formBadMsg = '';
            this.mailBadMsg = '';
            this.passBadMsg = '';
        }

        this.isUser = function(){
            return this.user;
        };

        this.isCompany = function(){
            return this.company;
        };

        this.erasePlace = function(arr, ind){
            arr.splice(ind, 1);
        };

        this.addPlace = function(arr){
            arr.push({});
        };

        this.companyEdit = function(isValid){
            if (!isValid){
                this.formBadMsg = 'Невірно заповнена форма даних!';
                return false;
            }

            $http.post("/api/sign-up-company", this.company)
                .success(function (resp) {
                    console.log(resp);
                    if (resp.message != 'ok') edit.formBadMsg = 'Щось пішло не так...';
                })
                .error(function (err) {
                    edit.formBadMsg = 'Щось пішло не так...';
                    console.log(err);
                });
        };

        this.userEdit = function(isValid){
            if (!isValid) {
                this.formBadMsg = 'Невірно заповнена форма даних!';
                return false;
            }

            $http.post("/api/edit-user", this.user)
                .success(function (resp) {
                    console.log(resp);
                    if (resp.message != 'ok') edit.formBadMsg = 'Щось пішло не так...';
                })
                .error(function (err) {
                    edit.formBadMsg = 'Щось пішло не так...';
                    console.log(err);
                });
        };

        this.passwordEdit = function() {
            if (this.password != this.repeatPassword) this.passBadMsg = 'Паролі не співпадають!';
            if (this.password == undefined) this.passBadMsg = 'Введіть пароль!';
            if (this.passBadMsg) return false;

            var req = {
                password: this.password
            }

            $http.post("/api/change-password-user", req)
                .success(function (resp) {
                    console.log(resp);
                    if (resp.message != 'ok') edit.passBadMsg = 'Щось пішло не так...';
                })
                .error(function (err) {
                    edit.passBadMsg = 'Щось пішло не так...';
                    console.log(err);
                });
        };

        this.mailEdit = function(isValid){
            if (!isValid) this.mailBadMsg = 'Неправильно вказана пошта!';
            if (this.mailPassword == undefined) this.mailBadMsg = 'Введіть пароль!';
            if (this.mail == undefined) this.mailBadMsg = 'Введіть пошту!';
            if (this.mailBadMsg) return false;

            var req = {
                mail: this.mail,
                password: this.mailPassword
            }

            $http.post("/api/change-mail-user", req)
                .success(function (resp) {
                    console.log(resp);
                    if (resp.message == 'Mail is already used') edit.mailBadMsg = 'Така пошта вже існує!';
                    if (resp.message == 'Incorrect password') edit.mailBadMsg = 'Невірний пароль!';
                })
                .error(function (err) {
                    edit.mailBadMsg = 'Щось пішло не так...';
                    console.log(err);
                });
        };
    }]);

