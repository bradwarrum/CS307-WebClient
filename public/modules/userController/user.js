angular.module('UserModule')

.controller('userController', ['$routeParams', '$http', '$scope', '$rootScope', '$location', function($routeParams, $http, $scope, $rootScope, $location){
  $scope.showUser = function(userID) {
    var req = {
      url: sIpPort+'/api/users/me?token='+$scope.globals.token,
      method: 'GET'
    };
    $http(req)
      .success(function(data, status, headers, config) {
        $scope.user = data;
      }).error(function(data, status, headers, config) {
          document.getElementById("responseBox").innerHTML = "Failed to Retrieve User";
      });
  };
  if($routeParams.userID != null){
    $scope.showUser($routeParams.userID);
  }else{
    $scope.showUser($rootScope.globals.userID);
  }

}])
