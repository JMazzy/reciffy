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

// Restangular.all('users').getList()
// .then(function(users) {
//    console.log(users);
//    $scope.users = users;
//  })

  topUserService.callTopUsers();
  topUserCooksService.callTopUserCooks();
  bestCooksService.callBestCooks();

  $scope.topUsers =  topUserService.getTopUsers();
  $scope.topCooks =  topUserCooksService.getTopUserCooks();
  $scope.bestCooks = bestCooksService.getBestCooks();

}]);
