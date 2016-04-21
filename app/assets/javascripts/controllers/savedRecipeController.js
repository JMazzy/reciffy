reciffy.controller('savedRecipeCtrl',
  [
    'savedRecipeService',
    'RecipeService',
    '$scope',
    '$stateParams',
    '$state',
    function(
      savedRecipeService,
      RecipeService,
      $scope,
      $stateParams,
      $state){
        RecipeService.setRecipes();
        $scope.recipes = RecipeService.getRecipes();

        // Use Service Method to make API call to get saved recipes
        savedRecipeService.callAllSavedRecipes();

        // Get Angular's version of all saved recipes
        $scope.savedRecipes = savedRecipeService.getSavedRecipes();

}]);
