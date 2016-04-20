reciffy.controller( 'RecipeShowCtrl', 
                    [ '$scope', '$state', '$stateParams', 'Restangular', 'RecipeService', 'madeRecipeService', 'currentUser',
                    function($scope, $state, $stateParams, Restangular, RecipeService, madeRecipeService, currentUser) {

  
  $scope.show_recipe_made = false;
  $scope.disabledStatus = true;

  Restangular.one('recipes', $stateParams.id).get()
  .then(function(recipe) {
    $scope.recipe = recipe;
    $scope.recipeIngredients = recipe.recipe_ingredients;
    $scope.tags = recipe.tags;
    $scope.newTag = { name: "" };
    $scope.comments = recipe.comments;
    $scope.madeRecipes = recipe.made_recipes;
    $scope.disabledStatus = ($scope.recipe.user_id != currentUser.id)
    console.log("Recipe is " + $scope.recipe.user_id)
    console.log("Disabled is " + $scope.disabledStatus)
    $scope.comment = {
      comment_description: "",
      recipe_id: recipe.id,
    };
    console.log(recipe.tags)
    $scope.checkMadeRecipeExists($scope.recipe)
  });



  $scope.createComment = function() {
    Restangular.all('recipes/' + $stateParams.id + '/comments')
    .post($scope.comment)
    .then( function(comment) {
      $scope.comments.unshift(comment);
      $scope.comment = {
        comment_description: "",
      };
    })
  }

  $scope.deleteComment = function(comment_id) {
    Restangular.one("recipes", $scope.recipe.id).one("comments", comment_id)
    .remove()
    .then(function(deletedComment) {
      for ( var c = 0; c < $scope.comments.length; c++ ) {
        if ( $scope.comments[c].id === deletedComment.id ) {
          $scope.comments.splice(c, 1);
        }
      }
    })
  }

  $scope.addTag = function() {
    Restangular.all('tags')
    .post($scope.newTag, { taggable_id: $scope.recipe.id, taggable_type: "Recipe"})
    .then( function(newTag) {
      $scope.tags.unshift(newTag);
      $scope.newTag = {
        name: "",
      };
    })
  }

  // Actually only deletes that particular TAGGING, not the tag itself
  $scope.deleteTag = function(tag_id) {
    Restangular.one("tags", tag_id)
    .remove({ taggable_id: $scope.recipe.id, taggable_type: "Recipe"})
    .then(function(deletedTag) {
      for ( var t = 0; t < $scope.tags.length; t++ ) {
        if ( $scope.tags[t].id === deletedTag.id ) {
          $scope.tags.splice(t, 1);
        }
      }
    })
  }

  $scope.addMadeRecipe = function(recipe) {
    madeRecipeService.create(recipe)
    $scope.show_recipe_made = true
  }
 
  $scope.checkMadeRecipeExists = function(recipe) {
    if ($scope.madeRecipes != null) {
      for (var i = 0; i < $scope.madeRecipes.length; i++) {
        if ($scope.madeRecipes[i].user_id == 2) {
           $scope.show_recipe_made = true
        }
      }
    } else {
       $scope.show_recipe_made = false
    }   
  }

  $scope.updateMainRecipe = function() {
    Restangular.one('recipes', $scope.recipe.id).patch({
      name: $scope.recipe.name,
      description: $scope.recipe.description,
      instructions: $scope.recipe.instructions,
    }).then(function(newRecipe) {
      console.log(newecipe);
    })
  };
}]);
