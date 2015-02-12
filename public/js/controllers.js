'use strict';

/* Controllers */

var worklyControllers = angular.module('worklyControllers', []);
var signupControllers = angular.module('signupControllers', []);

worklyControllers.controller('TemplateCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.get('/json/templatesUrl.json',{cache: false}).success(function(data) {
            $scope.templatesUrl = data;
        });
    }]);

signupControllers.controller('SignupCtrl', ['$scope', '$http',
    function($scope, $http){
        var signup = this;
        var study = {
            university: '',
            direction: '',
            start: '',
            end: '',
            degree: ''
        };
        var work = {
            job: '',
            company: '',
            start: '',
            end: '',
            description: ''
        };

        var checkData = function(){
            return signup.pass == signup.passR && signup.agreement;
        };

        this.isUser = true;
        this.isAdditional = false;
        this.isCongrats = false;
        this.studies=[study];
        this.works=[work];

        this.erasePlace = function(arr, ind){
            arr.splice(ind, 1);
        };

        this.addPlace = function(arr, type){
            var place;
            (type == 'work') ? place = work: place = study;
            arr.push({});
            for(var key in place)
                arr[arr.length - 1][key] = '';
        };

        this.companyReg = function(){
            var status = checkData();
            if (status) {
                var data = {
                    companyName: this.companyName,
                    password: this.pass,
                    mail: this.mail
                };
                var url = "/api/sign-up-company";

                $http.post(url, data)
                    .success(function (resp) {
                        console.log(resp);
                        if (resp.message == 'ok') signup.isAdditional = true;
                    })
                    .error(function (err) {
                        console.log(err);
                    });
            }
        };

        this.userReg = function(){
            var status = checkData();
            if (status) {
                var data = {
                    password: this.pass,
                    firstname: this.firstName,
                    secondname: this.secondName,
                    mail: this.mail
                };
                var url = "/api/sign-up-user";

                $http.post(url, data)
                    .success(function (resp) {
                        console.log(resp);
                        if (resp.message == 'ok') signup.isAdditional = true;
                    })
                    .error(function (err) {
                        console.log(err);
                    });
            }
        };

        this.companyComplete = function(){
            var data = {
                website: this.website,
                about: this.about,
                tel: this.tel,
                contacts: this.contacts,
                img: this.img
            };
            var url = "/api/edit-company";

            $http.post(url, data)
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
            var data = {
                position: this.position,
                dob: this.dob,
                city: this.city,
                tel: this.tel,
                img: this.about,
                about: this.about,
                skills: this.skills,
                study: this.studies,
                work: this.works
            };
            var url = "/api/edit-user";

            $http.post(url, data)
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