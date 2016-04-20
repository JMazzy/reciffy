reciffy.factory('madeRecipeService', ['Restangular', function(Restangular) {

    var obj = {};
    var made_recipes = [];

    obj.index = [];

    obj.getAllMadeRecipes= function(){
      made_recipes.splice(0,made_recipes.length)
      Restangular.all('made_recipes').getList().then(function(result){
        obj.populateMadeRecipes(result);
      });
    
    };

    obj.populateMadeRecipes = function(allMadeRecipes) {
       //console.log(allMadeRecipes.length)
       if (allMadeRecipes) {
          for (var i = 0; i < allMadeRecipes.length; i++) { 
            made_recipes.push(allMadeRecipes[i]);
          }
       }
    }

    obj.getMadeRecipes = function() {
       return made_recipes;
    }

    obj.getIndexOfMadeRecipe = function(madeRecipeObj) {
      return made_recipes.indexOf(madeRecipeObj);
    }

    obj.show = function( id ) {
      return Restangular.one( "made_recipes", id).get();
    };

    obj.create = function (recipe) {
        var madeRecipeObj = {recipe_id: recipe.id}
        return Restangular.all('made_recipes').post(madeRecipeObj).then(function(response)  {
            made_recipes.unshift(response);
        },
        function(response)  {
          alert("Could not mark recipe as made!");
       });
    };

    obj.destroy = function (madeRecipeObj) {
      return Restangular.one("made_recipes/" + madeRecipeObj.id).remove().then(
        function(res)  {
          index = made_recipes.indexOf(madeRecipeObj);
          made_recipes.splice(index, 1);
        },
        function(res)  {
          alert("Could not mark this recipe: " + madeRecipeObj.recipe.name);
        }    
      )
    };

    return obj;
}]);
