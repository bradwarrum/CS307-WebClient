var sIpAddr = "104.236.87.206";
var sPort = "80";
var sIpPort = 'http://'+sIpAddr+':'+sPort;

angular.module('LoginModule', []);
angular.module('HomeModule', []);
angular.module('HouseholdsModule', []);
angular.module('UserModule', []);
angular.module('RegistrationModule', []);


var app = angular.module('virtualPantry', ['LoginModule', 'HomeModule', 'HouseholdsModule', 'UserModule', 'RegistrationModule', 'ngRoute', 'ngCookies']);
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/login', {
        controller: 'loginController',
        templateUrl: 'modules/loginController/login.html'
      })
      .when('/', {
        controller: 'homeController',
        templateUrl: 'modules/homeController/home.html'
      })
      .when('/home', {
        controller: 'homeController',
        templateUrl: 'modules/homeController/home.html'
      })
      .when('/households', {
        controller: 'householdsController',
        templateUrl: 'modules/householdsController/householdlist.html'
      })
      .when('/households/:householdID', {
        controller: 'householdsController',
        templateUrl: 'modules/householdsController/household.html'
      })
      .when('/user', {
        controller: 'userController',
        templateUrl: 'modules/userController/user.html'
      })
      .when('/user/:userID', {
        controller: 'userController',
        templateUrl: 'modules/userController/user.html'
      })
      .when('/register', {
        controller: 'registrationController',
        templateUrl: 'modules/registrationController/register.html'
      })
      .otherwise({ redirectTo: '/home' });

      //needed for 'pretty' URLS (no #)
      $locationProvider.html5Mode(true);
    }]);
app.controller('mainController', ['$rootScope', '$location', '$http', '$cookieStore',
    function ($rootScope, $location, $http, $cookieStore) {

      $rootScope.globals = $cookieStore.get('globals') || {};

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
          // redirect to login page if not logged in
          if ($location.path() !== '/login' && $location.path() !== '/register' && !$rootScope.globals.token) {
              $location.path('/login');
          }
      });

      $rootScope.$on('logout', function (event, next, current) {
        $rootScope.globals = {};
        $cookieStore.remove('globals');
        $location.path('/login');
      });
    }]);
