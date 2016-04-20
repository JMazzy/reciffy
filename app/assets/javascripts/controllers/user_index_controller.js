reciffy.controller('UserIndexCtrl', ['$scope', '$state', '$stateParams', 'Restangular', 'UserService', function($scope, $state, $stateParams, Restangular, UserService) {

  Restangular.all('users').getList()
  .then(function(users) {
    console.log(users);
    $scope.users = users;
  })
}])
