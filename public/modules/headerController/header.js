angular.module('virtualPantry')
.controller('headerController', ['$cookieStore', '$location', '$scope', '$rootScope', function($cookieStore, $location, $scope, $rootScope){
  $scope.username = $rootScope.globals.emailAddress || '';
  $scope.$on('login', function(){
    $scope.username = $rootScope.globals.emailAddress;
  });
  $scope.logout = function(){
    $scope.username = '';
    $rootScope.globals = {};
    $cookieStore.remove('globals');
    $rootScope.$broadcast('logout');
  };
  $scope.goHome = function(){
    $location.path('/');
  }
}])
.directive('headerBar', function($rootScope){
  return {
    templateUrl: './modules/headerController/header-bar.html'
  };
});
