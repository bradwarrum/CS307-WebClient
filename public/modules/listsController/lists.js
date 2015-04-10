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

  $scope.getItems();
}])
