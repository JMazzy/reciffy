reciffy.controller( 'RecipeShowCtrl',
                    [ '$scope', '$state', '$stateParams', 'Restangular', 'RecipeService', 'madeRecipeService','currentUser', 'allMadeRecipes',
                    function($scope, $state, $stateParams, Restangular, RecipeService, madeRecipeService, currentUser,allMadeRecipes) {


  $scope.disabledStatus   = true;
  $scope.makeRecipe       = false;

  RecipeService.setUnits();
  RecipeService.setIngredients();
  RecipeService.setMadeRecipes(allMadeRecipes);

  RecipeService.setCurrentRecipe( $stateParams.id, currentUser );

  $scope.currentStuff = RecipeService.getCurrentStuff();
  $scope.recipe = RecipeService.getCurrentRecipe();

  $scope.tags = RecipeService.getTags();
  $scope.comments = RecipeService.getComments();
  $scope.units = RecipeService.getUnits();
  $scope.ingredients = RecipeService.getIngredients();

  //Recipe Ingredients Added

  $scope.r_unit = ""
  $scope.r_quantity = ""
  $scope.r_ingredient = ""

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
    $scope.currentStuff.show_recipe_made = true
  }

  $scope.checkMadeRecipeExists = function(recipe) {
    console.log("In here " + RecipeService.getRecipeMadeStatus(recipe,currentUser))
    return RecipeService.getRecipeMadeStatus(recipe,currentUser)
  }

  $scope.updateMainRecipe = function() {
    if (!RecipeService.getdisabledStatus()) {
      RecipeService.updateRecipe();
    }
  };

  $scope.deleteRecipeIngredient = function(ri) {
    if (!RecipeService.getdisabledStatus()) {
      RecipeService.removeRecipeIngredient(ri);

      $scope.r_unit = "";
      $scope.r_quantity = "";
      $scope.r_ingredient = "";
    }
  };

  $scope.addRecipeIngredient = function() {
    if (!RecipeService.getdisabledStatus()) {
      var ri = {unit_id: $scope.r_unit,
                ingredient_id: $scope.r_ingredient,
                quantity: $scope.r_quantity
      }
      RecipeService.addRecipeIngredient(ri);

      $scope.r_unit = "";
      $scope.r_quantity = "";
      $scope.r_ingredient = "";
    }
  };

  $scope.deleteRecipe = function() {
    RecipeService.deleteRecipe();
  };

  $scope.forkRecipe = function(recipe) {
    RecipeService.forkRecipe(recipe,currentUser);
  };

  $scope.submitRating = function() {
    console.log($scope.currentStuff.rating)
    RecipeService.rateRecipe();
  };

  $scope.openFileWindow = function () {
    angular.element( document.querySelector( '#fileUpload' ) ).trigger('click');
    console.log('triggering click');
  };

  $scope.uploadImage = function (path) {
    if ($scope.recipe.id) {
      // do put request
      Restangular.all('photos').post({
        photo: $scope.imageData,
        recipe_id: $scope.recipe.id
      }).then( function (result) {
        console.log('Uploaded image');
      }, function (error) {
        console.log('errors', JSON.stringify(errors));
      });
    };
  };

}]);
