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

  var createSavedRecipe = function(recipeId, userId) {
    var savedRecipeParams = {
      recipe_id: recipeId,
      user_id: userId
    };
    Restangular.all('saved_recipes').post(savedRecipeParams)
    .then(
      function(response)  {
        _saved[response.id] = response.recipe;
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
