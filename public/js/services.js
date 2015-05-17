"use strict";

var AuthenticationService = angular.module('AuthenticationService', []);

AuthenticationService.factory('AutService',
	['$cookieStore', '$rootScope',
		function ($cookieStore, $rootScope) {
			var service = {};

			service.SetCredentials = function (client) {

				$rootScope.globals = {
					currentUser: client
				};

				$cookieStore.put('client', $rootScope.globals);
			};

			service.isLogged = !($cookieStore.get('client') == undefined);

			service.ClearCredentials = function () {
				$rootScope.globals = {};
				$cookieStore.remove('globals');
				//$http.defaults.headers.common.Authorization = 'Basic ';
			};

			return service;
		}]);