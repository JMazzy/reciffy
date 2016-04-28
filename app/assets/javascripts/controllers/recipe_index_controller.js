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

  //Display max images in the row for category
  $scope.max = 4;

  // Horizontal Scrolling for Main Categories
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
      return Object.keys(category).length;
    } else {
      return eval(category).length;
    }
  }

  //Gets the current page of the recipe category
  $scope.getThisPage = function(category) {
    return $scope.page[category];
  }

  $scope.getPageEnd = function(category) {
    return ($scope.getThisPage(category) * $scope.max) + $scope.max
  }

  $scope.getPageBegin = function(category) {
    return $scope.getThisPage(category) * $scope.max
  }

  //Sets the next page of the recipe category
  $scope.setNextPage = function(category,page) {
    $scope.page[category] += page;
  }

  $scope.moveRight = function(category) {
    var len = $scope.getCategoryLength(category);
    var page = $scope.getThisPage(category);
    var lastRec = (page * $scope.max) + $scope.max;
    if (lastRec < len) {
      $scope.setNextPage(category, 1);
    }
  }

  $scope.moveLeft = function(category) {
    var page = $scope.getThisPage(category);
    var firstRec = (page * $scope.max);
    if (firstRec > 0) {
      $scope.setNextPage(category, -1);
    }
  }

  $scope.disableLeftScrollButton = function(category) {
    return $scope.getPageBegin(category) === 0 ? true : false;
  };

  $scope.disableRightScrollButton = function(category) {
    var len = $scope.getCategoryLength(category);
    var page = $scope.getThisPage(category);
    var lastRec = (page * $scope.max) + $scope.max;
    return lastRec >= len ? true : false;
  };

  // Horizontal scrolling for tags
  $scope.getTaggingsLength = function(tagListIndex) {
    var taggings = $scope.tagList[tagListIndex].taggings;
    var recipesForTag = 0;
    for (var tagging in taggings) {
      if (taggings[tagging].taggable_type == "Recipe") {
        recipesForTag++;
      }
    }
    return recipesForTag;
  };

  $scope.taggingsMoveRight = function(tagListIndex) {
    var len = $scope.getTaggingsLength(tagListIndex);
    var page = $scope.getThisPage($scope.tagList[tagListIndex].name);
    var lastRec = (page * $scope.max) + $scope.max;
    if (lastRec < len) {
      $scope.setNextPage($scope.tagList[tagListIndex].name, 1);
    }
  };

  $scope.taggingsMoveLeft = function(tagListIndex) {
    var page = $scope.getThisPage($scope.tagList[tagListIndex].name);
    var firstRec = (page * $scope.max);
    if (firstRec > 0) {
      $scope.setNextPage($scope.tagList[tagListIndex].name, -1);
    }
  };

  $scope.taggingsDisableLeftButton = function(tagListIndex) {
    return $scope.getPageBegin($scope.tagList[tagListIndex].name) === 0 ? true : false;
  };

  $scope.taggingsDisableRightButton = function(tagListIndex) {
    var len = $scope.getTaggingsLength(tagListIndex);
    var page = $scope.getThisPage($scope.tagList[tagListIndex].name);
    var lastRec = (page * $scope.max) + $scope.max;
    console.log(lastRec, len);
    return lastRec >= len ? true : false;
  };

  $scope.numLoaded = 0;

  $scope.loadMore = function() {
    if ($scope.numLoaded < $scope.tagIdList.length) {
      TagService.addOneTag($scope.numLoaded)
      .then(
        function() {
          var loadedTag = $scope.tagList[$scope.tagList.length - 1];
          $scope.page[loadedTag.name] = 0;
          $scope.numLoaded += 1;
        }
      );
    }
  };

  $scope.recipeTagging = function(tagging) {
    return tagging.taggable_type === "Recipe";
  }

  $scope.anyTaggings = function(tag) {
    taggingsNoUsers = [];

    for ( var t = 0; t < tag.taggings.length; t++ ) {
      if ( tag.taggings[t].taggable_type === "Recipe" ) {
        taggingsNoUsers.push(tag.taggings[t]);
      }
    }

    return taggingsNoUsers.length > 0;
  }

}]);
