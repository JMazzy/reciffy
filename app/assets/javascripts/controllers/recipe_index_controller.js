reciffy.controller( 'RecipeIndexCtrl', [ '$scope', '$state', '$stateParams', 'Restangular', 'RecipeService', function($scope, $state, $stateParams, Restangular, RecipeService ) {

  var recipeData = RecipeService.getRecipeData();
  recipeData.setRecipes();
  $scope.recipes = recipeData.getRecipes();

}]);
