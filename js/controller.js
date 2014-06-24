(function(){
	var app = angular.module("F1FeederApp.controllers",[]);

	app.controller("driversController",function($scope, ergastAPIService){
		$scope.nameFilter = null;
		$scope.driversList = [];
		$scope.driverDetail = 

		ergastAPIService.getDrivers().success(function(response){
			$scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
			// console.log($scope.driversList);
		});

		$scope.searchFilter = function(driver){
		 	var keyword = new RegExp($scope.nameFilter,'i');
		 	return !$scope.nameFilter || keyword.test(driver.Driver.givenName) || keyword.test(driver.Driver.givenName);
		};
	});

	app.controller("driverController",function($scope,ergastAPIService){
		$scope.id = $routeParams.id;
		$scope.driver = null;
		$scope.races = [];

		ergastAPIService.getDriverDetails($scope.id).success(function(response){
			$scope.driver =  response.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
		});

		ergastAPIService.getDriverRaces($scope.id).success(function(response){
			$scope.races = response.MRData.RaceTable.Races;
		});
	});
})();