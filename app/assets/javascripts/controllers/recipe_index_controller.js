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
  'RecommendationService',
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
    RecommendationService,
    currentUser ) {

  $scope.currentUser = currentUser;

  RecipeService.setRecipes();
  savedRecipeService.callAllSavedRecipes();
  madeRecipeService.getAllMadeRecipes();
  topRecipeService.callTopRecipes().then(
    function() {
      $scope.topRecipes = topRecipeService.getTopRecipes();
    }
  );
  RecommendationService.populateRecommendations();

  $scope.recipes = RecipeService.getRecipes();
  $scope.savedRecipes = savedRecipeService.getSavedRecipes();
  $scope.madeRecipes = madeRecipeService.getMadeRecipes();
  $scope.recs = RecommendationService.getRecommendations();

  $scope.allTaggings = Restangular.all('taggings').getList().$object;
}]);
