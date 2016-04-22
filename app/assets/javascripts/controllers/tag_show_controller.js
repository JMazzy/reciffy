reciffy.controller('TagCtrl', [ '$scope', '$state', '$stateParams', 'Restangular', 'RecipeService', 'TagService', 'UserService', function( $scope, $state, $stateParams, Restangular, RecipeService, TagService, UserService ){

  TagService.callOneTag($stateParams.id);
  RecipeService.setRecipes();

  $scope.tagHolder = TagService.getTagHolder();
  $scope.recipes = RecipeService.getRecipes();
  $scope.users = UserService.getUsers();

}]);
