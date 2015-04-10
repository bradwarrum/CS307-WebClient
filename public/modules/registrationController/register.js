
var sIpAddr = "104.236.87.206";
var sPort = "80";
var sIpPort = 'http://'+sIpAddr+':'+sPort;

angular.module('RegistrationModule')

.controller('registrationController', ['$location', '$scope', '$rootScope', 'RegistrationService', '$http', '$cookieStore',
  function ($location, $scope, $rootScope, RegistrationService, $http, $cookieStore) {
    $scope.credentials = {
      emailAddress: "asdf@asdf.com",
      firstName: "asdf",
      lastName: "asdf",
      password: "asdf",
      password2: "asdf"
    };

  $scope.register = function (credentials) {
    RegistrationService.register(credentials.emailAddress, credentials.firstName, credentials.lastName, credentials.password, function(data, status){
      if(status === 200){
        //okay
        $rootScope.globals.emailAddress = credentials.emailAddress;
        $rootScope.globals.firstName = data.firstName;
        $rootScope.globals.lastName = data.lastName;
        $rootScope.globals.token = data.token;
        $cookieStore.put('globals', $rootScope.globals);
        $rootScope.$broadcast('login');
        $location.path('/');
      }else if(status === 403){
        //usename taken
        document.getElementById("responseBox").innerHTML = "Registration Failed<br/>Username is already taken";
        $scope.credentials = {
          emailAddress: '',
          password: ''
        };
        $rootScope.globals = {};
        $cookieStore.remove('globals');
      }else if(status === 400){
        //malformed request
        document.getElementById("responseBox").innerHTML = "Registration Failed<br/>Bad Request";
        $scope.credentials = {
          emailAddress: '',
          password: ''
        };
        $rootScope.globals = {};
        $cookieStore.remove('globals');
      }else{
        //something else went wrong
        document.getElementById("responseBox").innerHTML = "Registration Failed<br/>Bad Request";
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

.factory('RegistrationService', ['$http', function($http) {
  var registrationService = {};

  registrationService.register = function(emailAddress, firstName, lastName, password, callback){
    hashedPassword = CryptoJS.SHA256(password).toString(); //include sha256.js  script

    var req = {
      url: sIpPort+'/api/users/register',
      method: 'POST',
      headers: {
        'Content-Type': undefined
      },
      data:   {
        emailAddress: emailAddress,
        firstName: emailAddress,
        lastName: emailAddress,
        password: hashedPassword}
    };
    $http(req)
      .success(function(data, status, headers, config) {
          //set token and redirect to user page?
          login(emailAddress, hashedPassword, callback);
      }).error(function(data, status, headers, config) {
          callback(data, status);
      });
  };

  registrationService.login = function(emailAddress, hashedPassword, callback){
    var req = {
      url: sIpPort+'/api/users/login',
      method: 'POST',
      headers: {
        'Content-Type': undefined
      },
      data:   { emailAddress: emailAddress,
        password: hashedPassword}
    };
    $http(req)
      .success(function(data, status, headers, config) {
          callback(data, status);
      }).error(function(data, status, headers, config) {
          callback(data, status);
      });
  };

  return registrationService;
}]);
