reciffy.factory('myRecipeService', ['Restangular', function(Restangular) {

    var obj = {};
    var my_recipes = [];

    obj.index = [];

    obj.getAllMyRecipes= function(){
      my_recipes.splice(0,my_recipes.length)
      Restangular.all('my_recipes').getList().then(function(result){
        obj.populateMyRecipes(result);
      });

    };

    obj.populateMyRecipes = function(allMyRecipes) {
       console.log(allMyRecipes.length)
       if (allMyRecipes.length) {
          for (var i = 0; i < allMyRecipes.length; i++) {
            my_recipes.push(allMyRecipes[i]);
          }
       }
    }

    obj.getMyRecipes = function() {
       return my_recipes;
    }

    obj.getIndexOfMyRecipe = function(myRecipeObj) {
      return my_recipes.indexOf(myRecipeObj);
    }

    obj.show = function( id ) {
      return Restangular.one( "my_recipes", id).get();
    };

    obj.create = function (recipe) {
        var myRecipeObj = {recipe_id: recipe.id}
        return Restangular.all('my_recipes').post(myRecipeObj).then(function(response)  {
            my_recipes.unshift(response);
        },
        function(response)  {
          alert("Could not mark recipe as my!");
       });
    };

    obj.destroy = function (myRecipeObj) {
      return Restangular.one("my_recipes/" + myRecipeObj.id).remove().then(
        function(res)  {
          index = my_recipes.indexOf(myRecipeObj);
          my_recipes.splice(index, 1);
        },
        function(res)  {
          alert("Could not mark this recipe: " + myRecipeObj.recipe.name);
        }
      )
    };

    return obj;
}]);
