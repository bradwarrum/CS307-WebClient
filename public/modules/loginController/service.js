
var sIpAddr = "104.236.87.206";
var sPort = "80";
var sIpPort = 'http://'+sIpAddr+':'+sPort;

angular.module('LoginModule')

.controller('loginController', ['$location', '$scope', '$rootScope', 'LoginService', '$http', '$cookieStore',
  function ($location, $scope, $rootScope, LoginService, $http, $cookieStore) {
  $scope.credentials = {
    emailAddress: 'asdf@asdf.com',
    password: 'asdf'
  };

  $scope.gotoRegister = function() {
      $location.path('/register');
  };

  $scope.login = function (credentials) {
    LoginService.login(credentials.emailAddress, credentials.password, function(data, status){
      if(status === 200){
        //okay
        $rootScope.globals.emailAddress = credentials.emailAddress;
        $rootScope.globals.firstName = data.firstName;
        $rootScope.globals.lastName = data.lastName;
        $rootScope.globals.userID = data.userID;
        $rootScope.globals.token = data.token;
        $cookieStore.put('globals', $rootScope.globals);
        $rootScope.$broadcast('login');
        $location.path('/');
      }else if(status === 403){
        //invalid password
        document.getElementById("responseBox").innerHTML = "Login Failed<br/>Username and password combination not found";
        $scope.credentials = {
          emailAddress: '',
          password: ''
        };
        $rootScope.globals = {};
        $cookieStore.remove('globals');
      }else if(status === 404){
        //user not found
        document.getElementById("responseBox").innerHTML = "Login Failed<br/>User not found";
        $scope.credentials = {
          emailAddress: '',
          password: ''
        };
        $rootScope.globals = {};
        $cookieStore.remove('globals');
      }else if(status === 400){
        //malformed request
        document.getElementById("responseBox").innerHTML = "Login Failed<br/>Bad Request";
        $scope.credentials = {
          emailAddress: '',
          password: ''
        };
        $rootScope.globals = {};
        $cookieStore.remove('globals');
      }else{
        //something else went wrong
        document.getElementById("responseBox").innerHTML = "Login Failed<br/>Bad Request";
        $scope.credentials = {
          emailAddress: '',
          password: ''
        };
        $rootScope.globals = {};
        $cookieStore.remove('globals');
      }
    });
  };
}])

.factory('LoginService', ['$http', function($http) {
  var loginService = {};
  var loggedIn = false;
  var token = "none";

  loginService.login = function(emailAddress, password, callback){
    hashedPassword = CryptoJS.SHA256(password).toString(); //include sha256.js  script
    var req = {
      url: sIpPort+'/api/users/login',
      method: 'POST',
      headers: {
        'Content-Type': undefined
      },
      data:   {
        emailAddress: emailAddress,
        password: hashedPassword}
    };
    $http(req)
      .success(function(data, status, headers, config) {
          //set token and redirect to user page?
          loggedIn = true;
          token = data.token;
          callback(data, status);
      }).error(function(data, status, headers, config) {
          loggedIn = false;
          token = "none";
          callback(data, status);
      });
  };
  loginService.logout = function(){
    loggedIn = false;
    token = "none";
  };
  loginService.getLoginStatus = function(){
    return loggedIn;
  };
  loginService.getToken = function(){
    return token;
  };
  return loginService;
}]);
