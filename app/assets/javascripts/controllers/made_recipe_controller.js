reciffy.controller('MyCtrl', ['Restangular', 'Auth', 'madeRecipeService', '$scope', 
                                         '$stateParams', '$state', 'currentUser', 
                                         function( Restangular, Auth, madeRecipeService, $scope, 
                                                   $stateParams, $state, 
                                                   currentUser){

  allMadeRecipes = madeRecipeService.getindex()
  $scope.currentUser = currentUser;
  console.log("User is " + currentUser.email)

  //subscriptionService.populateSubscriptions(allSubscriptions);
  $scope.made_recipes = madeRecipeService.getMadeRecipes(); 
  
}]);
