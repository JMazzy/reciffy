reciffy.controller( 'RecipeIndexCtrl', [ 'Auth', '$scope', '$state', '$stateParams', 'Restangular', 'RecipeService', 'savedRecipeService', 'myRecipeService', 'madeRecipeService', 'currentUser', function( Auth, $scope, $state, $stateParams, Restangular, RecipeService, savedRecipeService, myRecipeService, madeRecipeService, currentUser ) {

  $scope.currentUser = currentUser;

  RecipeService.setRecipes();
  savedRecipeService.callAllSavedRecipes();

  $scope.recipes = RecipeService.getRecipes();
  $scope.savedRecipes = savedRecipeService.getSavedRecipes();

  madeRecipeService.getAllMadeRecipes();
  $scope.madeRecipes = madeRecipeService.getMadeRecipes();

  myRecipeService.getAllMyRecipes($scope.currentUser.id);
  $scope.myRecipes = myRecipeService.getMyRecipes();

}]);
