reciffy.factory('ratedRecipeService', ['Restangular','RecipeService', function(Restangular, RecipeService) {

  var _rated = {};

  var callAllRatedRecipes = function() {
    // Don't make another API call if we already have the data
    if (Object.keys(_rated).length === 0) {
      Restangular.all('ratings').getList()
      .then(
        function(data) {
          populateRated(data);
          populateRecipes(data);
        },
        function(error) {
          console.error("API call for rated recipes didn't work.");
        }
      );
    }
  };

  var populateRated = function(rawData) {
    rawData.forEach(function(recipeJson) {
      _rated[recipeJson.id] = recipeJson;
    });
  };

  var populateRecipes = function(ratedRecipes) {
    ratedRecipes.forEach( function(rR) {
      RecipeService.setOneRecipe(rR.recipe_id);
    });
  };

  var getRatedRecipes = function() {
    return _rated;
  };

  var createRatedRecipe = function(recipeId, userId) {
    var ratedRecipeParams = {
      recipe_id: recipeId,
      user_id: userId
    };
    Restangular.all('ratings').post(ratedRecipeParams)
    .then(
      function(response)  {
        _rated[response.id] = response;
      },
      function(response)  {
        alert("API call for rated recipes didn't work.");
      }
    );
  };

  var deleteRatedRecipe = function(ratedRecipeId) {
    var ratedRecipeParams = {id: ratedRecipeId};
    Restangular.one('ratings', ratedRecipeId).remove(ratedRecipeParams)
    .then(
      function(response)  {
        delete _rated[response.id];
      },
      function(response)  {
        alert("API call for rated recipes didn't work.");
      }
    );
  };

  return {
    callAllRatedRecipes: callAllRatedRecipes,
    getRatedRecipes: getRatedRecipes,
    createRatedRecipe: createRatedRecipe,
    deleteRatedRecipe: deleteRatedRecipe
  };
}]);
