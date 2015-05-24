"use strict";

var AuthenticationService = angular.module('AuthenticationService', []);

AuthenticationService.factory('AuthService',
	['$cookieStore', '$rootScope', '$location', '$window',
		function ($cookieStore, $rootScope, $location, $window) {
			var service = {};

			service.setCredentials = function (data) {
				var client = {};

				if (data.user != undefined) {
					client.role = "user";
					client.name = data.user.firstname + " " + data.user.secondname;
				} else{
					client.role = "company";
					client.name = data.company.companyName;
				}

				$cookieStore.put('client', client);
			};

			service.getCredentials = function() {
				return $cookieStore.get('client');
			};

			service.clearCredentials = function () {
				$cookieStore.remove('client');
			};

			service.isLogged = function(){
				return !($cookieStore.get('client') == undefined);
			};

			service.redirectOut = function(){
				var redirectUrl = 'http://' + $window.location.host;
				$window.location.href = redirectUrl;
			};

			service.refresh = function(){
				$window.location.reload();
			};

			return service;
		}]);