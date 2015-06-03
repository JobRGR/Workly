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
                    else document.location.pathname = '/feed'
                })
                .error(function (err) {
                    post.formBadMsg = 'Щось пішло не так...';
                    console.log(err);
                });
        };

    }]);

createPostControllers.controller('editPostCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope){
        $scope.post = {}

        var href = document.location.href.split('/');
        var id = href[href.length - 1]

        $http.get('/api/post/' + id)
            .success(function (resp) {
                console.log(resp);
                $scope.post = resp.post;
            })
            .error(function (err) {
                $scope.formBadMsg = 'Щось пішло не так...';
                console.log(err);
            });

        $scope.resetBadMsg = function(){
            $scope.formBadMsg = '';
        };

        $scope.editPost = function(isValid){
            if (!isValid){
                $scope.formBadMsg = 'Невірно заповнена форма даних!';
                return false;
            }

            $http.post('/api/edit-post/' + id, $scope.post)
                .success(function (resp) {
                    console.log(resp);
                    if (resp.message != 'ok') $scope.formBadMsg = 'Щось пішло не так...';
                    else document.location.pathname = '/post/' + id;
                })
                .error(function (err) {
                    $scope.formBadMsg = 'Щось пішло не так...';
                    console.log(err);
                });
        };

    }]);