
var sIpAddr = "104.236.87.206";
var sPort = "8000";
var sIpPort = 'http://'+sIpAddr+':'+sPort;

angular.module('LoginModule')

.controller('loginController', ['$location', '$scope', '$rootScope', 'LoginService', '$http', '$cookieStore',
  function ($location, $scope, $rootScope, LoginService, $http, $cookieStore) {
  $scope.credentials = {
    emailAddress: 'john@domain.com',
    password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
  };

  $scope.login = function (credentials) {
    LoginService.login(credentials.emailAddress, credentials.password, function(response){
      if(response.success){
        $rootScope.globals.username = credentials.emailAddress;
        $rootScope.globals.firstName = response.data.firstName;
        $rootScope.globals.lastName = response.data.lastName;
        $rootScope.globals.token = response.data.token;
        $cookieStore.put('globals', $rootScope.globals);
        $rootScope.$broadcast('login');
        $location.path('/');
      }else{
        document.getElementById("responseBox").innerHTML = "Login Failed";
        $scope.credentials = {
          emailAddress: '',
          password: ''
        };
        $rootScope.globals = {};
        $cookieStore.remove('globals');
      }
    });
  }
}])

.factory('LoginService', ['$http', function($http) {
  var loginService = {};
  var loggedIn = false;
  var token = "none";

  loginService.login = function(emailAddress, password, callback){
    var req = {
      url: sIpPort+'/users/login',
      method: 'POST',
      headers: {
        'Content-Type': undefined
      },
      data:   { emailAddress: emailAddress,
        password: password}
    };
    $http(req)
      .success(function(data, status, headers, config) {
          //set token and redirect to user page?
          loggedIn = true;
          token = data.token;
          callback({success: true, data: data});
      }).error(function(data, status, headers, config) {
          loggedIn = false;
          token = "none";
          callback({success: false});
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
