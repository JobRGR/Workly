"use strict";

var AuthenticationService = angular.module('AuthenticationService', ['ngCookies']);

AuthenticationService.factory('AuthService',
	['$cookieStore', '$rootScope', '$location', '$window',
		function ($cookieStore, $rootScope, $location, $window) {
			var service = {};

			service.setCredentials = function (data) {
				var client = {};

				if (data.user != undefined) {
					client.role = "user";
					client.name = data.user.firstname + " " + data.user.secondname;
					client.id = data.user._id;
				} else{
					client.role = "company";
					client.name = data.company.companyName;
					client.id = data.company._id;
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

			service.redirectToFeed = function(){
				var redirectUrl = 'http://' + $window.location.host + '/feed';
				$window.location.href = redirectUrl;
			};

			service.refresh = function(){
				$window.location.reload();
			};

			service.isContentPage = function(){
				var host = 'http://' + $window.location.host;
				var href = $window.location.href;
				if (href == host + '/' || href == host + '/feed/')
					return true;
				return false;
			};

			return service;
		}]);