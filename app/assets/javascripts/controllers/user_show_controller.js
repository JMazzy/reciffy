reciffy.controller('UserShowCtrl', ['$scope', '$state', '$stateParams', 'Restangular', 'UserService', function($scope, $state, $stateParams, Restangular, UserService) {

  Restangular.one('users', $stateParams.id).get()
  .then(function(user) {
    $scope.user = user;
    $scope.profile = user.profile;
    $scope.userRecipes = user.recipes;
  })

  $scope.updateUserProfile = function(user) {
    Restangular.one('profiles', $scope.profile.id).patch({
      first_name: $scope.profile.first_name,
      last_name: $scope.profile.last_name,
      bio: $scope.profile.bio,
      tagline: $scope.profile.tagline,
      city: $scope.profile.city,
      state: $scope.profile.state
    })
  };

}])