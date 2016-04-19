reciffy.controller('savedRecipeCtrl',
  [
    'savedRecipeService',
    '$scope',
    '$stateParams',
    '$state',
    function(
      savedRecipeService,
      $scope,
      $stateParams,
      $state){
        // Use Service Method to make API call to get saved recipes
        savedRecipeService.callAllSavedRecipes();

        // Get Angular's version of all saved recipes
        $scope.saved = savedRecipeService.getSavedRecipes();
        console.log($scope.saved);

}]);
