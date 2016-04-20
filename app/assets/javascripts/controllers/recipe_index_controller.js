reciffy.controller( 'RecipeIndexCtrl', [ 'Auth', '$scope', '$state', '$stateParams', 'Restangular', 'RecipeService', 'savedRecipeService', 'myRecipeService', 'madeRecipeService', 'currentUser', function( Auth, $scope, $state, $stateParams, Restangular, RecipeService, savedRecipeService, myRecipeService, madeRecipeService, currentUser ) {

  RecipeService.setRecipes();
  savedRecipeService.callAllSavedRecipes();

  $scope.recipes = RecipeService.getRecipes();
  $scope.savedRecipes = savedRecipeService.getSavedRecipes();

}]);
