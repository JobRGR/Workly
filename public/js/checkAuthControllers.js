'use strict';

var checkAuthControllers = angular.module('checkAuthControllers',[]);

checkAuthControllers.controller('isUserLoggedIn', ['$cookieStore','$scope',
	function ($cookieStore, $scope) {
		console.log($cookieStore.user,$cookieStore.company);
		$scope.isLoggedIn = ($cookieStore.get("user") != undefined || $cookieStore.get("company") != undefined);
		$scope.user = undefined;
		if ($cookieStore.get("user") != undefined)
			$scope.user = $cookieStore.get("user").userName;
		if ($cookieStore.get("company") != undefined)
			$scope.user = $cookieStore.get("company").companyName;
}]);