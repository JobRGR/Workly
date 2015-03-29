'use strict';

/*Sign Controllers*/

adminControllers.controller('signCtrl', ['$scope', '$http', '$location', '$rootScope',
  function ($scope, $http, $location, $rootScope) {
    var isSignIn = $location.path() == "/sign-in";

    $scope.signAdminInputList = {
      in: [{
        name: 'Login',
        placeholder: 'Add Login',
        value: '',
        class: 'login',
        type: 'text'
      }, {
        name: "Password",
        value: '',
        placeholder: "Add Password",
        class: 'password',
        type: 'password'
      }],
      up: [{
        name: "Login",
        value: '',
        placeholder: "Add Login",
        class: 'login',
        type: 'text'
      }, {
        name: "Password",
        value: '',
        placeholder: "Add Password",
        class: 'password',
        type: 'password'
      }, {
        name: "Confirm Password",
        value: '',
        placeholder: "Add Confirm Password",
        class: 'confirm',
        type: 'password'
      }, {
        name: "Key",
        value: '',
        placeholder: "Add Key",
        class: 'key',
        type: 'password'
      }]
    };


    $scope.signAdminData = {
      title: isSignIn ? "Sign-in as Admin" : "Sign-up as Admin",
      input: isSignIn ? $scope.signAdminInputList.in : $scope.signAdminInputList.up,
      action: isSignIn ? "Sign in" : "Sign up",
      link: {
        href: isSignIn ? "/admin/#/sign-up" : "/admin/#/sign-in",
        text: isSignIn ? "Sign up" : "Sign in"
      }
    };

    $scope.adminNotification = {
      type: "",
      text: "",
      is: false
    };


    $scope.signFunc = function(){
      if(isSignIn) signInFunc();
      else signUpFunc()
    };

    function signInFunc(){
      var send = {
          login: $scope.signAdminData.input[0].value,
          password: $scope.signAdminData.input[1].value
        }
        , isCheck = checkData(send)
        , url = '/api/admin/sign-in';

      console.log(send);
      if(!isCheck.res) return makeErrorFunc("Error in: "+isCheck.name);

      makeInfoFunc();

      $http.post(url, send).
        success(function(data, status, headers, config) {
          if(data.message != "ok") return makeErrorFunc(data.message);
          makeOkFunc("");
          console.log(arguments);
          $rootScope.loggedAdmin = data.admin;
        }).
        error(function(data, status, headers, config) {
          makeErrorFunc(data.message);
          console.log(arguments);
        });
    }

    function signUpFunc(){
      var send = {
          login: $scope.signAdminData.input[0].value,
          password: $scope.signAdminData.input[1].value,
          confirm: $scope.signAdminData.input[2].value,
          key: $scope.signAdminData.input[3].value
        }
        , isCheck = checkData(send)
        , url = '/api/admin/sign-up';

      if(!isCheck.res) return makeErrorFunc("Incorrect "+isCheck.name);
      if(send.confirm != send.password) return makeErrorFunc("Confirm password don't equal with password value");
      delete data.confirm;

      makeInfoFunc();

      $http.post(url, send).
        success(function(data, status, headers, config) {
          if(data.message != "ok") return makeErrorFunc(data.message);
          makeOkFunc("Successful registration");
          console.log(arguments);
          $rootScope.loggedAdmin = data.admin;
        }).
        error(function(data, status, headers, config) {
          makeErrorFunc(data.message);
          console.log(arguments);
        });
    }

    function checkData(data){
      for(var key in data)
        if(!data[key].length)
          return {res: false, name: key};

      return {res: true, name: ""}
    }

    function makeErrorFunc(text){
      $scope.adminNotification = {
        type: "danger",
        text: text,
        is: true
      }
    }
    function makeOkFunc(text){
      $scope.adminNotification = {
        type: "success",
        text: text,
        is: true
      }
    }

    function makeInfoFunc(){
      $scope.adminNotification = {
        type: "waring",
        text: "Sending Data...",
        is: true
      }
    }
  }]);