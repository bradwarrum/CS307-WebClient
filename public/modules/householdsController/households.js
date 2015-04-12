angular.module('HouseholdsModule')

.controller('householdsController', ['HouseholdService', '$location','$routeParams', '$http', '$scope', '$rootScope', '$location', function(HouseholdService, $location, $routeParams, $http, $scope, $rootScope, $location){
  $scope.newHousehold = {
    householdName: '',
    householdDescription: ''
  };

  $scope.listInfo = {
    listName: ''
  };


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
        $location.path('/households');
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
  $scope.createHousehold = function(newHousehold){
    HouseholdService.createHousehold(newHousehold);
    $scope.refreshHouseholds();
  };

  $scope.createList = function(listInfo){
    HouseholdService.createList(listInfo, $routeParams.householdID);
    $scope.showHousehold($routeParams.householdID);
  };


  $scope.deleteHousehold = function() {
    var req = {
      url: sIpPort+'/api/households/'+$routeParams.householdID+'/remove?token='+$scope.globals.token,
      method: 'POST'
    };
    $http(req)
      .success(function(data, status, headers, config) {
          $location.path('/households/');
      }).error(function(data, status, headers, config) {
          document.getElementById("responseBox").innerHTML = "Failed to delete household";
      });
  };


  if($routeParams.householdID != null){
    $scope.showHousehold($routeParams.householdID);
  }else{
    $scope.refreshHouseholds();
  }
}])

.factory('HouseholdService', ['$http', '$rootScope', function($http, $rootScope) {
  var householdService = {};
  householdService.createHousehold = function(newHousehold) {
    var req = {
      url: sIpPort+'/api/households/create?token='+$rootScope.globals.token,
      method: 'POST',
      headers: {
        'Content-Type': undefined
      },
      data:   {
        householdName: newHousehold.householdName,
        householdDescription: newHousehold.householdDescription}
    };
    $http(req)
      .success(function(data, status, headers, config) {
          //redirect to new households page
      }).error(function(data, status, headers, config) {
          //household couldn't be created
      });
    };
  householdService.createList = function(listInfo, householdID) {
    var req = {
      url: sIpPort+'/api/households/'+householdID+'/lists/create?token='+$rootScope.globals.token,
      method: 'POST',
      headers: {
        'Content-Type': undefined
      },
      data: {
        listName: listInfo.listName
      }
    };
    $http(req)
      .success(function(data, status, headers, config) {
          //redirect to new households page
      }).error(function(data, status, headers, config) {
          //household couldn't be created
      });
    };
  return householdService;
}]);
