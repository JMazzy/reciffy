reciffy.controller('UserIndexCtrl', ['$scope', '$state', '$stateParams', 'Restangular', 'UserService', function($scope, $state, $stateParams, Restangular, UserService) {

  $scope.users = UserService.getUsers();

}])
