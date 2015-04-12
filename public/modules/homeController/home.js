angular.module('HomeModule')

.controller('homeController', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location){
  $scope.logout = function(){
    $rootScope.$broadcast('logout');
  };
  $scope.myInfo = function(){
    $location.path('/user');
  };
  $scope.households = function(){
    $location.path('/households');
  };
}])
