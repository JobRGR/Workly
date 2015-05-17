'use strict';

/* Directives*/

var formFilling = angular.module('formFilling',[]);
var checkAuthDirectives = angular.module('checkAuthDirectives',['ngCookies']);

checkAuthDirectives.directive("ngIs", ['$cookieStore','$animate'
	//function ($cookieStore,$animate) {
	//	return {
	//		multiElement: true,
	//		restrict: 'E',
	//		scope
	//		link: function($scope, $element, $attr, ctrl, $transclude) {
	//			var block, childScope, previousElements;
	//			$scope.$watch($attr.ngIs, function ngIsWatchAction() {
	//
	//				if ($cookieStore.get("user") != undefined || $cookieStore.get("company") != undefined) {
	//					$scope.userName = $cookieStore.get("user") !== undefined ? $cookieStore.get("user").userName : $cookieStore.get("company").companyName
	//					if (!childScope) {
	//						$transclude(function (clone, newScope) {
	//							childScope = newScope;
	//							clone[clone.length++] = document.createComment(' end ngIf: ' + $attr.ngIs + ' ');
	//							block = {
	//								clone: clone
	//							};
	//							$animate.enter(clone, $element.parent(), $element);
	//						});
	//					}
	//				} else {
	//					if (previousElements) {
	//						previousElements.remove();
	//						previousElements = null;
	//					}
	//					if (childScope) {
	//						childScope.$destroy();
	//						childScope = null;
	//					}
	//					if (block) {
	//						previousElements = getBlockNodes(block.clone);
	//						$animate.leave(previousElements).then(function () {
	//							previousElements = null;
	//						});
	//						block = null;
	//					}
	//				}
	//			});
	//		}
	//	}
]);

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
                };
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

formFilling.directive('input', [function() {
    return {
        restrict: 'E',
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {
            if (
                'undefined' !== typeof attrs.type
                && 'date' === attrs.type
                && ngModel
            ) {
                ngModel.$formatters.push(function(modelValue) {
                    if (!modelValue) return undefined;
                    return new Date(modelValue);
                });
            }
        }
    }
}]);