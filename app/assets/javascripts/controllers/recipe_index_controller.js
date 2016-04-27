reciffy.controller( 'RecipeIndexCtrl',
[
  'Auth',
  '$scope',
  '$state',
  '$stateParams',
  'Restangular',
  'RecipeService',
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
    madeRecipeService,
    topRecipeService,
    trendingRecipeService,
    RecommendationService,
    TagService,
    UserService,
    currentUser,
    RecentRecipeService) {

  $scope.currentUser = currentUser;

  topRecipeService.callTopRecipes();
  trendingRecipeService.callTrendingRecipes();
  RecommendationService.populateRecommendations();
  UserService.setUsers();

  $scope.recipes = RecipeService.getRecipes();
  $scope.topRecipes =  topRecipeService.getTopRecipes();
  $scope.trendingRecipes =  trendingRecipeService.getTrendingRecipes();
  $scope.recentRecipes = RecentRecipeService.getRecipes();
  $scope.recdRecipes = RecommendationService.getRecommendations();

  TagService.clearTagList();
  TagService.setTagIdList();
  $scope.tagList = TagService.getTagList();
  $scope.tagIdList = TagService.getIdList();

  //The current page of the category (horizontal scrolling)
  $scope.page = {};
  $scope.page["recentRecipes"] = 0;
  $scope.page["topRecipes"] = 0;
  $scope.page["recdRecipes"] = 0;
  $scope.page["trendingRecipes"] = 0;

  //Max displays per category page (horizontal scrolling)
  $scope.max = 4;

  //Gets the array/object length of the recipe category
  $scope.getCategoryLength = function(category) {
    //category = "$scope." + category;
    category = $scope[category];
    if (typeof eval(category) == "object") {
      //console.log(Object.keys(category).length, category);
      return Object.keys(category).length;
    } else {
      return eval(category).length;
    }
  }

  //Gets the current page of the recipe category
  //refactor?
  $scope.getThisPage = function(category) {
    var page;
    switch(category) {
    case "recentRecipes":
      page = $scope.page.recentRecipes;
        break;
    case "topRecipes":
      page = $scope.page.topRecipes;
        break;
    case "recdRecipes":
      page = $scope.page.recdRecipes;
        break;
    case "trendingRecipes":
      page = $scope.page.trendingRecipes;
        break;
    }

    return page;
  }

  $scope.getPageEnd = function(category) {
    return ($scope.getThisPage(category) * $scope.max) + $scope.max
  }

  $scope.getPageBegin = function(category) {
    return $scope.getThisPage(category) * $scope.max
  }

  //Sets the next page of the recipe category
  //refactor?
  $scope.setNextPage = function(category,page) {
    switch(category) {
    case "recentRecipes":
      $scope.page.recentRecipes += page;
      break;
    case "topRecipes":
      $scope.page.topRecipes += page;
      break;
    case "recdRecipes":
      $scope.page.recdRecipes += page;
      break;
    case "trendingRecipes":
      $scope.page.trendingRecipes += page;
      break;
    }
  }

  $scope.moveRight = function(category) {

    var len = $scope.getCategoryLength(category);
    var page = $scope.getThisPage(category);
    var lastRec = (page * $scope.max) + $scope.max;

    if (lastRec < len) {
      $scope.setNextPage(category, 1);
    }
    //console.log(len, page, lastRec);
  }

  $scope.moveLeft = function(category) {

    var page = $scope.getThisPage(category);
    var firstRec = (page * $scope.max);

    if (firstRec > 0) {
      $scope.setNextPage(category, -1);
    }
  }

  $scope.numLoaded = 0;

  $scope.loadMore = function() {
    if ($scope.numLoaded < $scope.tagIdList.length) {
      console.log($scope.numLoaded, $scope.tagIdList.length)
      TagService.addOneTag($scope.numLoaded);
      $scope.numLoaded += 1;
    }
  };

  $scope.disableLeftScrollButton = function(category) {
    return $scope.getPageBegin(category) === 0 ? true : false;
  };

  $scope.disableRightScrollButton = function(category) {
    var len = $scope.getCategoryLength(category);
    var page = $scope.getThisPage(category);
    var lastRec = (page * $scope.max) + $scope.max;
    return lastRec >= len ? true : false;
  };

  $scope.recipeTagging = function(tagging) {
    return tagging.taggable_type === "Recipe";
  }

  $scope.anyTaggings = function(tag) {
    return tag.taggings.length > 0;
  }
}]);
