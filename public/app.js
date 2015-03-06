var sIpAddr = "104.236.87.206";
var sPort = "8000";
var sIpPort = 'http://'+sIpAddr+':'+sPort;

angular.module('LoginModule', []);
angular.module('HomeModule', []);


var app = angular.module('virtualPantry', ['LoginModule', 'HomeModule', 'ngRoute', 'ngCookies']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/login', {
        controller: 'loginController',
        templateUrl: 'modules/loginController/login.html'
      })
      .when('/', {
        controller: 'homeController',
        templateUrl: 'modules/homeController/home.html'
      })
      .otherwise({ redirectTo: '/login' });
    }])
app.run(['$rootScope', '$location', '$http', '$cookieStore',
    function ($rootScope, $location, $http, $cookieStore) {

      $rootScope.globals = $cookieStore.get('globals') || {};

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
          // redirect to login page if not logged in
          if ($location.path() !== '/login' && !$rootScope.globals.token) {
              $location.path('/login');
          }
      });
    }]);
