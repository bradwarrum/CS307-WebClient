angular.module('HouseholdsModule')

.controller('householdsController', ['$routeParams', '$http', '$scope', '$rootScope', '$location', function($routeParams, $http, $scope, $rootScope, $location){
  $scope.refreshHouseholds = function() {
    var req = {
      url: sIpPort+'/api/users/me?token='+$scope.globals.token,
      method: 'GET'
    };
    $http(req)
      .success(function(data, status, headers, config) {
        $scope.globals.households = data.households;
      }).error(function(data, status, headers, config) {
        //error getting households
        $scope.globals.households = {};
      });
  };
  $scope.showHousehold = function(householdID) {
    var req = {
      url: sIpPort+'/api/households/'+householdID+'?token='+$scope.globals.token,
      method: 'GET'
    };
    $http(req)
      .success(function(data, status, headers, config) {
        $scope.household = data;
      }).error(function(data, status, headers, config) {
          document.getElementById("responseBox").innerHTML = "Failed to Retrieve Household";
      });
  };
  if($routeParams.householdID != null){
    $scope.showHousehold($routeParams.householdID);
  }else{
    $scope.refreshHouseholds();
  }
}])
