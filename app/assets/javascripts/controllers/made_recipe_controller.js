reciffy.controller('MadeCtrl', ['Restangular', 'Auth', 'madeRecipeService', '$scope', '$stateParams', '$state', 'currentUser', function( Restangular, Auth, madeRecipeService, $scope, $stateParams, $state, currentUser){

  $scope.currentUser = currentUser;
  madeRecipeService.getAllMadeRecipes()
  $scope.made_recipes = madeRecipeService.getMadeRecipes();

  $scope.removeMadeRecipe = function(madeRecipeObj) {
  	madeRecipeService.destroy(madeRecipeObj)
  }

}]);
