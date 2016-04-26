reciffy.factory('savedRecipeService', ['Restangular', 'RecipeService', function(Restangular, RecipeService) {

  var _saved = {};

  var callAllSavedRecipes = function() {
    // Don't make another API call if we already have the data
    if (Object.keys(_saved).length === 0) {
      return Restangular.all('saved_recipes').getList()
      .then(
        function(data) {
          populateSaved(data);
          populateRecipes(data);
          return getSavedRecipes();
        },
        function(error) {
          console.error("API call for saved recipes didn't work.");
        }
      );
    }
  };

  var populateSaved = function(rawData) {
    rawData.forEach(function(recipeJson) {
      _saved[recipeJson.id] = recipeJson;
    });
  };

  var populateRecipes = function(rawData) {
    rawData.forEach(function(saved) {
      RecipeService.setOneRecipe(saved.recipe_id);
    })
  }

  var getSavedRecipes = function() {
    return _saved;
  };

  var createSavedRecipe = function(recipeId, userId) {
    var savedRecipeParams = {
      recipe_id: recipeId,
      user_id: userId
    };
    Restangular.all('saved_recipes').post(savedRecipeParams)
    .then(
      function(response)  {
        _saved[response.id] = response;
      },
      function(response)  {
        alert("API call for saved recipes didn't work.");
      }
    );
  };

  var deleteSavedRecipe = function(savedRecipeId) {
    var savedRecipeParams = {id: savedRecipeId};
    Restangular.one('saved_recipes', savedRecipeId).remove(savedRecipeParams)
    .then(
      function(response)  {
        delete _saved[response.id];
      },
      function(response)  {
        alert("API call for saved recipes didn't work.");
      }
    );
  };

  return {
    callAllSavedRecipes: callAllSavedRecipes,
    getSavedRecipes: getSavedRecipes,
    createSavedRecipe: createSavedRecipe,
    deleteSavedRecipe: deleteSavedRecipe
  };
}]);
