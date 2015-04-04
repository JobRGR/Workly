'use strict';

var adminDirectives = angular.module('adminDirectives', []);


/*Common Components*/

adminDirectives.directive("header", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/common/header.html",
        controller: 'headerCtrl'
    };
});

/*Main Components*/

adminDirectives.directive("selectModel", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/main/model-list/select-models.html",
        controller: 'navCtrl'
    };
});

adminDirectives.directive("modelList", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/main/model-list/model-list.html",
        controller: 'mainCtrl'
    };
});

adminDirectives.directive("usersList", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/main/model-list/users-list.html",
        controller: 'modelCtrl'
    };
});

adminDirectives.directive("companiesList", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/main/model-list/companies-list.html",
        controller: 'modelCtrl'
    };
});

adminDirectives.directive("postsList", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/main/model-list/posts-list.html",
        controller: 'modelCtrl'
    };
});

adminDirectives.directive("adminsList", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/main/model-list/admins-list.html",
        controller: 'modelCtrl'
    };
});

adminDirectives.directive("controlLine", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/main/model-list/control-line.html",
        controller: 'modelCtrl'
    };
});

/*Sign Components*/

adminDirectives.directive("signTitle", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/sign/sign-components/sign-title.html",
        controller: 'signCtrl'
    };
});

adminDirectives.directive("signForm", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/sign/sign-components/sign-form.html",
        controller: 'signCtrl'
    };
});

adminDirectives.directive("signNotification", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/sign/sign-components/sign-notification.html",
        controller: 'signCtrl'
    };
});

/*Edit Components*/

adminDirectives.directive("edit", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/main/model-edit/edit.html",
        controller: 'editCtrl'
    };
});

adminDirectives.directive("editUser", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/main/model-edit/edit-user.html",
        controller: 'editCtrl'
    };
});

adminDirectives.directive("editCompany", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/main/model-edit/edit-company.html",
        controller: 'editCtrl'
    };
});

adminDirectives.directive("editPost", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/main/model-edit/edit-post.html",
        controller: 'editCtrl'
    };
});

adminDirectives.directive("editAdmin", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/main/model-edit/edit-admin.html",
        controller: 'editCtrl'
    };
});

adminDirectives.directive("editWork", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/main/model-edit/edit-work.html",
        controller: 'editCtrl'
    };
});

adminDirectives.directive("editStudy", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/main/model-edit/edit-study.html",
        controller: 'editCtrl'
    };
});

adminDirectives.directive("editPassword", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/main/model-edit/edit-password.html",
        controller: 'editCtrl'
    };
});

adminDirectives.directive("editMail", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/main/model-edit/edit-mail.html",
        controller: 'editCtrl'
    };
});

