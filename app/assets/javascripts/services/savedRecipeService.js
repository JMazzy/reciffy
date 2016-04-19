reciffy.factory('savedRecipeService', ['Restangular', function(Restangular) {

  var _saved = {};

  var callAllSavedRecipes = function() {
    // Don't make another API call if we already have the data
    if (Object.keys(_saved).length === 0) {
      Restangular.all('saved_recipes').getList()
      .then(
        function(data) {
          populateSaved(data);
        },
        function(error) {
          console.log("API call for saved recipes didn't work.");
        }
      );
    }
  };

  var populateSaved = function(rawData) {
    console.log(rawData);
    rawData.forEach(function(recipeJson) {
      _saved[recipeJson.id] = recipeJson.recipe;
    });
  };

  var getSavedRecipes = function() {
    return _saved;
  };

  var createSavedRecipe = function() {

  };

  var deleteSavedRecipe = function() {

  };

  return {
    callAllSavedRecipes: callAllSavedRecipes,
    getSavedRecipes: getSavedRecipes,
    createSavedRecipe: createSavedRecipe,
    deleteSavedRecipe: deleteSavedRecipe
  };
}]);
