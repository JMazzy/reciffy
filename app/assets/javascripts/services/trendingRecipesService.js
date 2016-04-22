reciffy.factory('trendingRecipeService', ['Restangular', function(Restangular) {

  var _trending = {};

  var callTrendingRecipes = function() {
    // Don't make another API call if we already have the data
    if (Object.keys(_trending).length === 0) {
      Restangular.all('trending_recipes').getList()
      .then(
        function(data) {
          populateTrendingRecipes(data);
        },
        function(error) {
          console.log("API call for trending recipes didn't work.");
        }
      );
    }
  };

  var populateTrendingRecipes = function(rawData) {
    rawData.forEach(function(recipeJson) {
      _trending[recipeJson.id] = recipeJson;
    });
  };

  var getTrendingRecipes = function() {
    return _trending;
  };

  return {
    callTrendingRecipes: callTrendingRecipes,
    getTrendingRecipes: getTrendingRecipes
  };
}]);
