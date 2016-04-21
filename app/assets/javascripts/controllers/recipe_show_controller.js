reciffy.controller( 'RecipeShowCtrl',
                    [ '$scope', '$state', '$stateParams', 'Restangular', 'RecipeService', 'madeRecipeService','currentUser',
                    function($scope, $state, $stateParams, Restangular, RecipeService, madeRecipeService,currentUser) {


  $scope.show_recipe_made = false;
  $scope.disabledStatus = true;
  $scope.makeRecipe = false;

  RecipeService.setCurrentRecipe($stateParams.id,currentUser);

  $scope.currentStuff = RecipeService.getCurrentStuff();
  $scope.recipe = RecipeService.getCurrentRecipe();

  $scope.tags = RecipeService.getTags();
  $scope.newTag = RecipeService.getTag();
  $scope.comments = RecipeService.getComments();
  $scope.comment = RecipeService.getComment();
  $scope.disabledStatus = RecipeService.getdisabledStatus();

  $scope.getDisabledStatus = function() {
    return RecipeService.getdisabledStatus();
  }

  $scope.makeRecipeIngredient = function() {
    $scope.makeRecipe = !$scope.makeRecipe;
    console.log(!$scope.makeRecipe)
  }

  $scope.getMakeRecipeIngredient = function() {
    return $scope.makeRecipe ;
  }

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

  $scope.updateMainRecipe = function() {
    if (!RecipeService.getdisabledStatus()) {
      RecipeService.updateRecipe();
    }
  };

  $scope.deleteRecipeIngredient = function(ri) {
    if (!RecipeService.getdisabledStatus()) {
       RecipeService.removeRecipeIngredient(ri);
    }
  };


  $scope.submitRating = function() {
    RecipeService.rateRecipe();
  };
}]);
