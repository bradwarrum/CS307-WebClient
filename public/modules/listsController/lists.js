angular.module('ListsModule')

.controller('listsController', ['$routeParams', '$http', '$scope', '$rootScope', '$location', function($routeParams, $http, $scope, $rootScope, $location){
  $scope.list = {};
  $scope.getItems = function() {
    var req = {
      url: sIpPort+'/api/households/'+$routeParams.householdID+'/lists/'+$routeParams.listID+'?token='+$scope.globals.token,
      method: 'GET'
    };
    $http(req)
      .success(function(data, status, headers, config) {
        $scope.list = data;
      }).error(function(data, status, headers, config) {
          document.getElementById("responseBox").innerHTML = "Failed to get list";
      });
  };

  $scope.deleteList = function() {
    var req = {
      url: sIpPort+'/api/households/'+$routeParams.householdID+'/lists/'+$routeParams.listID+'/remove?token='+$scope.globals.token,
      method: 'POST'
    };
    $http(req)
      .success(function(data, status, headers, config) {
          $location.path('/households/'+$routeParams.householdID);
      }).error(function(data, status, headers, config) {
          document.getElementById("responseBox").innerHTML = "Failed to delete list";
      });
  };

  $scope.getItems();
}])
