reciffy.controller('UserShowCtrl', ['$scope', '$state', 'Restangular', 'UserService', function($scope, $state, Restangular, UserService) {

  $scope.user = UserService.getUser($scope.id);

  $scope.updateUserProfile = function(user) {
    Restangular.one('profiles').get({user_id: $user.id}).then(function(profile) {
      console.log(profile);
    });
  };

}])