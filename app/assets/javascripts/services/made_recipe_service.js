reciffy.factory('madeRecipeService', ['Restangular', function(Restangular) {

    var obj = {};
    var made_recipes = [];

    obj.index = [];

    obj.getindex = function(){
      Restangular.all('made_recipes').getList().then(function(result){
        obj.populateMadeRecipes(result);
      });
    
    };

    obj.populateMadeRecipes = function(allMadeRecipes) {
       console.log(allMadeRecipes.length)
       if (allMadeRecipes.length) {
          console.log("REcipes")
          for (var i = 0; i < allMadeRecipes.length; i++) { 
                      console.log(allMadeRecipes[i])
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

    obj.create = function ( madeRecipeObj ) {
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
