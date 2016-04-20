reciffy.controller('MyCtrl', ['Restangular', 'Auth', 'myRecipeService', '$scope',
                              '$stateParams', '$state', 'currentUser',
                              function( Restangular, Auth, myRecipeService, $scope,
                                        $stateParams, $state, currentUser){

  $scope.currentUser = currentUser;
  myRecipeService.getAllMyRecipes()
  $scope.my_recipes = myRecipeService.getMyRecipes();

  $scope.removeMyRecipe = function(myRecipeObj) {
  	myRecipeService.destroy(myRecipeObj)
  }

}]);
