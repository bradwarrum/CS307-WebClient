var app = angular.module('virtualPantry', ['ui.router']);

var sIpAddr = "104.236.87.206";
var sPort = "8000";
var sIpPort = 'http://'+sIpAddr+':'+sPort;

//Logging in an existing user
app.controller('loginController', function ($scope, $rootScope, TokenService, $http) {

  $scope.credentials = {
    emailAddress: 'john@domain.com',
    password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
  }

  $scope.login = function (credentials, $TokenService) {
    var req = {
      url: sIpPort+'/users/login',
      method: 'POST',
      headers: {
        'Content-Type': undefined
      },
      data:   { emailAddress: credentials.emailAddress,
        password: credentials.password}
    }
    $http(req)
      .success(function(data, status, headers, config) {
          //set token and redirect to user page?
          TokenService.set(data.token);
          document.getElementById("responseBox").innerHTML = TokenService.get();
      }).error(function(data, status, headers, config) {

      })
  }
});

app.factory('TokenService', function () {
  var tokenService = {};
  var token = "none";

  tokenService.get = function() {
    return token;
  }

  tokenService.set = function(newToken) {
    token = newToken;
  }

  return tokenService;
});


//Registering a new user
app.controller('userInfoController', function($scope, $rootScope, TokenService, $http) {

  $scope.getMyInfo = function($TokenService) {
    var req = {
      url: sIpPort+'/users/me?token='+TokenService.get(),
      method: 'GET',
      headers: {
        'Content-Type': undefined
      },
      data:   { token: TokenService.get()}
    }
    $http(req)
      .success(function(data, status, headers, config) {
          document.getElementById("responseBox").innerHTML = data.firstName;
      }).error(function(data, status, headers, config) {

      })
  };
});
