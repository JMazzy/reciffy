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
  'TagService',
  'UserService',
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
    trendingRecipeService,
    RecommendationService,
    TagService,
    UserService,
    currentUser ) {

  $scope.currentUser = currentUser;

  RecipeService.setRecipes();
  savedRecipeService.callAllSavedRecipes();
  madeRecipeService.getAllMadeRecipes();
  topRecipeService.callTopRecipes();
  trendingRecipeService.callTrendingRecipes();
  topRecipeService.callTopRecipes();
  RecommendationService.populateRecommendations();
  TagService.setTags();
  UserService.setUsers();

  $scope.recipes = RecipeService.getRecipes();
  $scope.savedRecipes = savedRecipeService.getSavedRecipes();
  $scope.madeRecipes = madeRecipeService.getMadeRecipes();
  $scope.topRecipes =  topRecipeService.getTopRecipes();
  $scope.trendingRecipes =  trendingRecipeService.getTrendingRecipes();

  $scope.recs = RecommendationService.getRecommendations();

  $scope.allTaggings = Restangular.all('taggings').getList().$object;
}]);
