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
    TagService,
    UserService,
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
  TagService.setTags();
  UserService.setUsers();

  $scope.recipes = RecipeService.getRecipes();
  $scope.savedRecipes = savedRecipeService.getSavedRecipes();
  $scope.madeRecipes = madeRecipeService.getMadeRecipes();
  $scope.topRecipes =  topRecipeService.getTopRecipes();
  $scope.trendingRecipes =  trendingRecipeService.getTrendingRecipes();
  $scope.recentRecipes = RecentRecipeService.getRecipes();

  $scope.recs = RecommendationService.getRecommendations();

  $scope.allTaggings = Restangular.all('taggings').getList().$object;

  // $scope.page = 1;
  // $scope.items = [];
  // $scope.loadNewItems = function () {
  //   itemsFactory.getAll({ page: $scope.page }).then(function (items) {
  //     $scope.items = $scope.items.concat(items);
  //     $scope.page += 1;
  //   });
  // };

}]);
