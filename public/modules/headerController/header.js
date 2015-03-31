angular.module('virtualPantry')
.controller('headerController', ['$cookieStore', '$location', '$scope', '$rootScope', function($cookieStore, $location, $scope, $rootScope){
  $scope.username = $rootScope.globals.emailAddress || '';
  $scope.$on('login', function(){
    $scope.username = $rootScope.globals.emailAddress;
  });
  $scope.logout = function(){
    $rootScope.$broadcast('logout');
  };
  $scope.goHome = function(){
    $location.path('/');
  }
  $scope.$on('logout', function(){
      $scope.username = '';
  })
}])
.directive('headerBar', function($rootScope){
  return {
    templateUrl: './modules/headerController/header-bar.html'
  };
})
