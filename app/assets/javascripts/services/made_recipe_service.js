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
            subscription.unshift(response);
            obj.refreshBoard(0);
        },
        function(response)  {
          alert("Could not add your board: " + madeRecipeObj.title);
       });
    };

    obj.update = function ( madeRecipeObj,data ) {
        return Restangular.one('made_recipes', madeRecipeObj.id).get().then(function(response)  {
             response.title = data.title;
             console.log(response);
             response.put();
        },
        function(response)  {
          alert("Could not update your board: " + boardObj.title);
       });
    };

    obj.destroy = function (boardObj) {
      return Restangular.one("boards/" + boardObj.id).remove().then(
        function(res)  {
          index = boards.indexOf(boardObj);
          boards.splice(index, 1);
          obj.refreshBoard(0);
        },
        function(res)  {
          alert("Could not delete your board: " + boardObj.title);
      }      
    )
    };

    return obj;
}]);
