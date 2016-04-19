reciffy.controller('UserIndexCtrl', ['$scope', '$state', 'Restangular', 'UserService', function($scope, $state, Restangular, UserService) {

  $scope.users = Restangular.all('users').getList().$object

}])
