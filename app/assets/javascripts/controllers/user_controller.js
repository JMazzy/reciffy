reciffy.controller('UserCtrl', ['$scope', '$state', 'Restangular', '_', function($scope, $state, Restangular, _) {

  $scope.users = Restangular.all('users').getList().$object;

  $scope.updateUserProfile = function(user) {
    Restangular.one('profiles').get({user_id: $user.id}).then(function(profile) {
      profile.first_name
    });
  }

}])