'use strict';

var adminControllers = angular.module('adminControllers', []);

/*Header Controllers*/

adminControllers.controller('headerCtrl', ['$scope', '$http', '$rootScope',
  function ($scope, $http, $rootScope) {
    $http.get('/api/admin/get-status').
      success(function(data, status, headers, config) {
        $scope.admin = data.admin;
      }).
      error(function(data, status, headers, config) {
        $scope.model = undefined;
      });

    $scope.logout = function(){
      $http.post('/api/admin/logout').
        success(function(data, status, headers, config) {
          $scope.admin = undefined;
          $rootScope.loggedAdmin = undefined;
        }).
        error(function(data, status, headers, config) {
        });
    }

  }]);



/*Main Controllers*/

adminControllers.controller('mainCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $scope.type = "user";

        $scope.isUser = function(){
            return $scope.type == "user"
        };

        $scope.isPost = function(){
            return $scope.type == "post"
        };

        $scope.isCompany = function(){
            return $scope.type == "company"
        };
    }]);

adminControllers.controller('navCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $scope.navModelItems = [
            {
                data: 'user',
                text: 'Users',
                active: true
            },
            {
                data: 'company',
                text: 'Companies',
                active: false
            },
            {
                data: 'post',
                text: 'Posts',
                active: false
            }
        ];

        $scope.index = 0;

        $scope.changeModel = function ($event, $index){
            var model = $scope.navModelItems[$index];
            $scope.type = model.data;
            $scope.navModelItems[$scope.index].active = false;
            $scope.navModelItems[$index].active = true;
            $scope.index = $index;
        };

    }]);

adminControllers.controller('modelCtrl', ['$scope', '$http',
    function ($scope, $http) {
        var url = '/api/get-'
          , add = $scope.type == "user" ? 'users' : $scope.type == "company" ? 'companies' : 'posts';

        $scope.dataObj = {
            message: "",
            data: []
        };

        $scope.query = "";

        $http.get(url+add).
          success(function(data, status, headers, config) {
              $scope.dataObj.data = data[add] ? data[add] : [];
              $scope.dataObj.message = $scope.dataObj.data.length ? "ok" : "No Data";
          }).
          error(function(data, status, headers, config) {
              $scope.dataObj.message = "Request Error";
              $scope.dataObj.data = [];
          });

        $scope.isData = function(){
            return $scope.dataObj.data.length
        };

        $scope.deleteItem = function($event, $index){
            var id = $scope.dataObj.data[$index]._id
              , url = '/api/remove-' + $scope.type + '/' + id;

            $scope.dataObj.data.splice($index,1);
            if(!$scope.dataObj.data.length)
                $scope.dataObj.message = "No Data";

            $http.get(url).
              success(function(data, status, headers, config) {
                  console.log(arguments);
              }).
              error(function(data, status, headers, config) {
                  console.log(arguments);
              });
        };

        $scope.dropModel = function(){
            var url = url = '/api/drop-' + $scope.type;

            $scope.dataObj.data = [];
            $scope.dataObj.message = "No Data";

            $http.get(url).
              success(function(data, status, headers, config) {
                  console.log(arguments);
              }).
              error(function(data, status, headers, config) {
                  console.log(arguments);
              });
        };

        $scope.dropDB = function(){
            var url = '/api/drop-db';

            $scope.dataObj.data = [];
            $scope.dataObj.message = "No Data";

            $http.get(url).
              success(function(data, status, headers, config) {
                  console.log(arguments);
              }).
              error(function(data, status, headers, config) {
                  console.log(arguments);
              });
        };

        $scope.isSearch = function ($event){
          var isKey = $event.keyCode == 13;
          if(isKey) $scope.searchModel()
        };

        $scope.searchModel = function(){
            var url = '/api/search-' + $scope.type
              , add = $scope.type == "user" ? 'users' : $scope.type == "company" ? 'companies' : 'posts';

            $http.post(url, {query: $scope.query}).
              success(function(data, status, headers, config) {
                  console.log(arguments);
                  $scope.dataObj.data = data[add] ? data[add] : [];
                  $scope.dataObj.message = $scope.dataObj.data.length ? "ok" : "No Data";
              }).
              error(function(data, status, headers, config) {
                  console.log(arguments);
                  $scope.dataObj.message = "Request Error";
                  $scope.dataObj.data = [];
              });
        }
    }]);

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



