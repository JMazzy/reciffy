reciffy.controller('UserIndexCtrl', 
['$scope', 
'$state', 
'$stateParams', 
'Restangular', 
'UserService',
'topUserService',
'topUserCooksService',
 function(
$scope, 
$state, 
$stateParams, 
Restangular, 
UserService,
topUserService,
topUserCooksService) {

// Restangular.all('users').getList()
// .then(function(users) {
//    console.log(users);
//    $scope.users = users;
//  })

  topUserService.callTopUsers();
  topUserCooksService.callTopUserCooks();
  
  $scope.topUsers =  topUserService.getTopUsers();
  $scope.topCooks =  topUserCooksService.getTopUserCooks();
}]);