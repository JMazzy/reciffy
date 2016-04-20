reciffy.controller( 'RecipeIndexCtrl', [ 'Auth', '$scope', '$state', '$stateParams', 'Restangular', 'RecipeService', 'savedRecipeService', 'myRecipeService', 'madeRecipeService', function( Auth, $scope, $state, $stateParams, Restangular, RecipeService, savedRecipeService, myRecipeService, madeRecipeService ) {

  RecipeService.setRecipes();
  savedRecipeService.callAllSavedRecipes();

  $scope.recipes = RecipeService.getRecipes();
  $scope.savedRecipes = savedRecipeService.getSavedRecipes();

}]);
