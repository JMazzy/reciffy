reciffy.controller('UserIndexCtrl',
['$scope',
'$state',
'$stateParams',
'Restangular',
'UserService',
'topUserService',
'topUserCooksService',
'bestCooksService',
 function(
$scope,
$state,
$stateParams,
Restangular,
UserService,
topUserService,
topUserCooksService,
bestCooksService) {

  topUserService.callTopUsers();
  topUserCooksService.callTopUserCooks();
  bestCooksService.callBestCooks();

  $scope.topUsers =  topUserService.getTopUsers();
  $scope.topCooks =  topUserCooksService.getTopUserCooks();
  $scope.bestCooks = bestCooksService.getBestCooks();

}]);
