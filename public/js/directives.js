'use strict';

/* Directives*/

var formFilling = angular.module('formFilling',[]);

formFilling.directive("ngFileread", [function () {
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

formFilling.directive('ngRepeatPass', function (){
    return {
        require: 'ngModel',
        scope:{
            ngRepeatPass: '='
        },
        link: function(scope, elem, attr, ngModel) {
            if (!ngModel) return;

            scope.$watch('ngRepeatPass', function() {
                CheckValidity(ngModel.$viewValue);
            });

            ngModel.$parsers.unshift(CheckValidity);    //For DOM -> model validation
            ngModel.$formatters.unshift();              //For DOM -> model validation

            function CheckValidity(value){
                var valid = value === scope.ngRepeatPass;
                ngModel.$setValidity('repeatPass', valid);
                return value;
            }
        }
    };
});