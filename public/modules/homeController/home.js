angular.module('HomeModule')

.controller('homeController', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location){
  $scope.logout = function(){
    $rootScope.$broadcast('logout');
  };
  $scope.myInfo = function(){

  };
  $scope.households = function(){
    $location.path('/households');
  };
}])
