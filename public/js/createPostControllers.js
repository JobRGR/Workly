'use strict';

var createPostControllers = angular.module('createPostControllers', ['ngAnimate']);

createPostControllers.controller('createPostCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope){
        var post = this;
        this.newPost={
            openQuestion:[],
            testQuestion:[]
        };

        this.resetBadMsg = function(){
            this.formBadMsg = '';
        };

        this.addOpenQ = function(){
            this.newPost.openQuestion.push({});
        };

        this.addTestQ = function(){
            this.newPost.testQuestion.push({answers:[]});
        };

        this.eraseTest = function(arr, ind){
            arr.splice(ind, 1);
        };

        this.addVariant = function(arr){
            arr.push('');
        };

        this.eraseVariant = function(arr, ind){
            arr.splice(ind, 1);
        };

        this.createPost = function(isValid){
            if (!isValid){
                this.formBadMsg = 'Невірно заповнена форма даних!';
                return false;
            }

            $http.post("/api/create-post", this.newPost)
                .success(function (resp) {
                    console.log(resp);
                    if (resp.message != 'ok') post.formBadMsg = 'Щось пішло не так...';
                })
                .error(function (err) {
                    post.formBadMsg = 'Щось пішло не так...';
                    console.log(err);
                });
        };

    }]);