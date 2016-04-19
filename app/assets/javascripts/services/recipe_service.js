reciffy.factory('RecipeService', ['Restangular', '$state', function(Restangular, $state) {
  var obj = {}

  var _recipeList = {
    list: Restangular.all('recipes').getList().$object,
    current: nil,
  }

  obj.getRecipeList = function() {
    return _recipeList.list;
  };

  obj.blankRecipe = function() {
    return {  name: nil,
              description: nil,
              prep_time: nil,
              cook_time: nil,
              user_id: nil,
              original_id: nil,
              instructions: nil }
  };

  obj.createRecipe = function() {
    Restangular.all('recipes').post({

    }).then(
      function(recipe) {
        _recipeList.push(recipe);
      },
      function(error) {

      }
    );
  };

  obj.updateRecipe = function() {

  };

  obj.deleteRecipe = function() {

  };

  obj.addIngredient = function() {

  };

  obj.removeIngredient = function() {

  }

  return obj;
}])
