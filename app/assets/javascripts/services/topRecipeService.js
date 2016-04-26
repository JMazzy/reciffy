reciffy.factory('topRecipeService', ['Restangular', 'RecipeService', function(Restangular, RecipeService) {

  var _top = [];

  var callTopRecipes = function() {
    // Don't make another API call if we already have the data
    if (Object.keys(_top).length === 0) {
      return Restangular.all('top_recipes').getList()
      .then(
        function(data) {
          populateTopRecipes(data);
          return getTopRecipes();
        },
        function(error) {
          console.error("API call for rated recipes didn't work.");
        }
      );
    }
  };

  var populateTopRecipes = function(rawData) {
    rawData.forEach(function(tR) {
      _top.push(tR);
      RecipeService.setOneRecipe(tR.id)
    });
  };

  var getTopRecipes = function() {
    return _top;
  };

  return {
    callTopRecipes: callTopRecipes,
    getTopRecipes: getTopRecipes
  };
}]);
