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
  'trendingRecipeService',
  'RecommendationService',
  'currentUser',
  'RecentRecipeService',
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
    trendingRecipeService,
    RecommendationService,
    currentUser,
    RecentRecipeService ) {

  $scope.currentUser = currentUser;

  RecipeService.setRecipes();
  savedRecipeService.callAllSavedRecipes();
  madeRecipeService.getAllMadeRecipes();
  topRecipeService.callTopRecipes();
  trendingRecipeService.callTrendingRecipes();
  topRecipeService.callTopRecipes();
  RecommendationService.populateRecommendations();

  $scope.recipes = RecipeService.getRecipes();
  $scope.savedRecipes = savedRecipeService.getSavedRecipes();
  $scope.madeRecipes = madeRecipeService.getMadeRecipes();
  $scope.topRecipes =  topRecipeService.getTopRecipes();
  $scope.trendingRecipes =  trendingRecipeService.getTrendingRecipes();
  $scope.recentRecipes = RecentRecipeService.getRecipes();

  $scope.recs = RecommendationService.getRecommendations();

  $scope.allTaggings = Restangular.all('taggings').getList().$object;
}]);
