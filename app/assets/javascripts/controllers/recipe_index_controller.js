reciffy.controller( 'RecipeIndexCtrl', [ 'Auth', '$scope', '$state', '$stateParams', 'Restangular', 'RecipeService', 'savedRecipeService', 'madeRecipeService', 'currentUser', function( Auth, $scope, $state, $stateParams, Restangular, RecipeService, savedRecipeService, madeRecipeService, currentUser ) {

  $scope.currentUser = currentUser;

  console.log(currentUser.id);

  RecipeService.setRecipes();
  savedRecipeService.callAllSavedRecipes();
  madeRecipeService.getAllMadeRecipes();

  $scope.recipes = RecipeService.getRecipes();
  $scope.savedRecipes = savedRecipeService.getSavedRecipes();
  $scope.madeRecipes = madeRecipeService.getMadeRecipes();
}]);
