reciffy.controller( 'RecipeIndexCtrl', [ 'Auth', '$scope', '$state', '$stateParams', 'Restangular', 'RecipeService', 'savedRecipeService', 'madeRecipeService', 'currentUser', function( Auth, $scope, $state, $stateParams, Restangular, RecipeService, savedRecipeService, madeRecipeService, currentUser ) {

  $scope.currentUser = currentUser;

  RecipeService.setRecipes();
  savedRecipeService.callAllSavedRecipes();
  madeRecipeService.getAllMadeRecipes();

  $scope.recipes = RecipeService.getRecipes();
  $scope.savedRecipes = savedRecipeService.getSavedRecipes();
  $scope.madeRecipes = madeRecipeService.getMadeRecipes();

  $scope.allTaggings = Restangular.all('taggings').getList().$object;
}]);
