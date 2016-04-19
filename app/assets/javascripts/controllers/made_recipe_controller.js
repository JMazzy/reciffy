reciffy.controller('MyCtrl', ['Restangular', 'Auth', 'madeRecipeService', '$scope', 
                                         '$stateParams', '$state', 'currentUser', 
                                         function( Restangular, Auth, madeRecipeService, $scope, 
                                                   $stateParams, $state, 
                                                   currentUser){

  allMadeRecipes = madeRecipeService.getindex()
  $scope.currentUser = currentUser;
  //subscriptionService.populateSubscriptions(allSubscriptions);
  $scope.made_recipes = madeRecipeService.getMadeRecipes(); 
  
  $scope.removeMadeRecipe = function(madeRecipeObj) {
  	madeRecipeService.destroy(madeRecipeObj)
  }

}]);
