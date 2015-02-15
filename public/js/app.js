"use strict";

angular.module('worklyApp', [
    'worklyControllers'
]);

var signupApp = angular.module('signupApp', [
    'worklyControllers',
    'signupControllers',
    'formFilling'
]);