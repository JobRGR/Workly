'use strict';

/* Directives*/

var fileReader = angular.module('fileReader',[]);

fileReader.directive("ngFileread", [function () {
    return {
        scope: {
            ngFileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onloadend = function (loadEvent) {
                    scope.$apply(function () {
                        scope.ngFileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);