<<<<<<< HEAD
reciffy.controller( 'RecipeShowCtrl', [ '$scope', '$state', '$stateParams', 'Restangular', 'RecipeService', 'madeRecipeService',
                    function($scope, $state, $stateParams, Restangular, RecipeService, madeRecipeService ) {


  $scope.show_recipe_made = false;

  Restangular.one('recipes', $stateParams.id).get()
  .then(function(recipe) {
    $scope.recipe = recipe;
    console.log("1", recipe);
    $scope.recipeIngredients = recipe.recipe_ingredients;
    $scope.tags = recipe.tags;
    $scope.newTag = { name: "" };
    $scope.comments = recipe.comments;
    $scope.madeRecipes = recipe.made_recipes;
    $scope.comment = {
      comment_description: "",
      recipe_id: recipe.id,
    };
    $scope.checkMadeRecipeExists($scope.recipe)
  });
=======
reciffy.controller( 'RecipeShowCtrl',
                    [ '$scope', '$state', '$stateParams', 'Restangular', 'RecipeService', 'madeRecipeService',
                    function($scope, $state, $stateParams, Restangular, RecipeService, madeRecipeService) {


  $scope.show_recipe_made = false;
  $scope.disabledStatus = true;
>>>>>>> 630de3592314214bc169da706c9b06b09424c72c

  RecipeService.setCurrentRecipe($stateParams.id);

  $scope.recipe = RecipeService.getCurrentRecipe();
  $scope.tags = RecipeService.getTags();
  $scope.newTag = RecipeService.getTag();
  $scope.comments = RecipeService.getComments();
  $scope.comment = RecipeService.getComment();

  $scope.createComment = function() {
    RecipeService.addComment();
  }

  $scope.deleteComment = function(comment_id) {
    RecipeService.removeComment(comment_id);
  }

  $scope.addTag = function() {
    RecipeService.addTag();
  }

  // Actually only deletes that particular TAGGING, not the tag itself
  $scope.deleteTag = function(tag_id) {
    RecipeService.removeTag(tag_id);
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

<<<<<<< HEAD
  console.log("hello", $scope.recipe);
=======
  $scope.updateMainRecipe = function() {
    Restangular.one('recipes', $scope.recipe.id).patch({
      name: $scope.recipe.name,
      description: $scope.recipe.description,
      instructions: $scope.recipe.instructions,
    }).then(function(newRecipe) {
      console.log(newecipe);
    })
  };
>>>>>>> 630de3592314214bc169da706c9b06b09424c72c
}]);
