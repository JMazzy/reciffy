reciffy.controller( 'RecipeIndexCtrl', [ 'Auth', '$scope', '$state', '$stateParams', 'Restangular', 'RecipeService', 'savedRecipeService', 'myRecipeService', 'madeRecipeService', 'currentUser', function( Auth, $scope, $state, $stateParams, Restangular, RecipeService, savedRecipeService, myRecipeService, madeRecipeService, currentUser ) {

  $scope.currentUser = currentUser;

  console.log(currentUser.id);

  RecipeService.setRecipes();
  savedRecipeService.callAllSavedRecipes();
  madeRecipeService.getAllMadeRecipes();

  $scope.recipes = RecipeService.getRecipes();
  $scope.savedRecipes = savedRecipeService.getSavedRecipes();
  $scope.madeRecipes = madeRecipeService.getMadeRecipes();
}]);
