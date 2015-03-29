'use strict';

var editControllers = angular.module('editControllers', ['ngAnimate']);

editControllers.controller('EditCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope){
        var edit = this;

        $rootScope.$watch(function() {
            edit.user = $rootScope.user;
            edit.company = $rootScope.company;
        });

        this.resetBadMsg = function(){
            this.formBadMsg = '';
            this.mailBadMsg = '';
            this.passBadMsg = '';
            this.nameBadMsg = '';
        }

        this.eraseImg = function(){
            if (this.user) this.user.img = '';
            if (this.company) this.company.img = '';
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

            $http.post("/api/edit-company", this.company)
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
            if (this.passBadMsg) return false;

            var req = {password: this.password};
            var url = (this.user ? '/api/change-password-user':'/api/change-password-company');

            $http.post(url, req)
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
            if (this.mailBadMsg) return false;

            var req = {
                mail: this.mail,
                password: this.mailPassword
            };
            var url = (this.user ? '/api/change-mail-user':'/api/change-mail-company');

            $http.post(url, req)
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

        this.nameEdit = function(isValid){
            if (this.namePassword == undefined) this.mailBadMsg = 'Введіть пароль!';
            if (this.name == undefined) this.mailBadMsg = 'Введіть назву!';
            if (this.nameBadMsg) return false;

            var req = {
                name: this.name,
                password: this.namePassword
            };

            $http.post("/api/edit-company", req)
                .success(function (resp) {
                    console.log(resp);
                    if (resp.message == 'Name is already used') edit.nameBadMsg = 'Така назва вже існує!';
                    if (resp.message == 'Incorrect password') edit.mailBadMsg = 'Невірний пароль!';
                })
                .error(function (err) {
                    edit.mailBadMsg = 'Щось пішло не так...';
                    console.log(err);
                });
        };
    }]);

