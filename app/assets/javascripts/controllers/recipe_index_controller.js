reciffy.controller( 'RecipeIndexCtrl',
[
  'Auth',
  '$scope',
  '$state',
  '$stateParams',
  'Restangular',
  'RecipeService',
  'savedRecipeService',
  'madeRecipeService',
  'topRecipeService',
  'currentUser',
  function(
    Auth,
    $scope,
    $state,
    $stateParams,
    Restangular,
    RecipeService,
    savedRecipeService,
    madeRecipeService,
    topRecipeService,
    currentUser ) {

  $scope.currentUser = currentUser;

  RecipeService.setRecipes();
  savedRecipeService.callAllSavedRecipes();
  madeRecipeService.getAllMadeRecipes();
  topRecipeService.callTopRecipes();

  $scope.recipes = RecipeService.getRecipes();
  $scope.savedRecipes = savedRecipeService.getSavedRecipes();
  $scope.madeRecipes = madeRecipeService.getMadeRecipes();
  $scope.topRecipes =  topRecipeService.getTopRecipes();


  $scope.allTaggings = Restangular.all('taggings').getList().$object;
}]);
