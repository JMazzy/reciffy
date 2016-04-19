reciffy.controller('ratedRecipeCtrl',
  [
    'ratedRecipeService',
    '$scope',
    '$stateParams',
    '$state',
    function(
      ratedRecipeService,
      $scope,
      $stateParams,
      $state){
        // Use Service Method to make API call to get saved recipes
        ratedRecipeService.callAllRatedRecipes();

        // Get Angular's version of all saved recipes
        $scope.rated = ratedRecipeService.getRatedRecipes();

}]);
