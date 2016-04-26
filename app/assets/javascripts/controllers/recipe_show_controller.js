reciffy.controller( 'RecipeShowCtrl',
  [
    '$scope',
    '$state',
    '$stateParams',
    'Restangular',
    'RecipeService',
    'madeRecipeService',
    'currentUser',
    'allMadeRecipes',
    function(
      $scope,
      $state,
      $stateParams,
      Restangular,
      RecipeService,
      madeRecipeService,
      currentUser,
      allMadeRecipes) {

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
  $scope.photo = {};

  //Recipe Ingredients Added

  $scope.r_unit = ""
  $scope.r_quantity = ""
  $scope.r_ingredient = ""

  $scope.getDisabledStatus = function() {
    return RecipeService.getdisabledStatus();
  }

  $scope.makeRecipeIngredient = function() {
    $scope.makeRecipe = !$scope.makeRecipe;
  }

  $scope.getMakeRecipeIngredient = function() {
    return $scope.makeRecipe ;
  }

  $scope.createComment = function() {
    RecipeService.addComment();
  }

  $scope.commentDeletable = function(comment) {
    return comment.user_id == currentUser.id;
  }

  $scope.deleteComment = function(comment) {
    if ( $scope.commentDeletable(comment) ) {
      RecipeService.removeComment(comment);
    }
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
      if ($scope.r_unit.title) {
          $scope.r_unit = $scope.r_unit.title
      } else {
          $scope.r_unit = $scope.r_unit.originalObject
      }

      if ($scope.r_ingredient.title) {
          $scope.r_ingredient = $scope.r_ingredient.title
      } else {
          $scope.r_ingredient = $scope.r_ingredient.originalObject
      }

      var ri = {
        //unit_id: $scope.r_unit,
        ingredient_name: $scope.r_ingredient,
        unit_type: $scope.r_unit,
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
    RecipeService.rateRecipe();
  };

  $scope.openFileWindow = function () {
    angular.element( document.querySelector( '#fileUpload' ) ).trigger('click');
  };

  $scope.uploadImage = function (path) {
    if ($scope.recipe.id) {
      // do put request
      console.log($scope.photo);
      Restangular.all('photos').post({
        photo: {
          photo: $scope.photo.imageData,
          recipe_id: $scope.recipe.id
        }
      }).then( function (result) {
        // Success
      }, function (error) {
        // Error
        console.error(error);
      });
    };
  };


 // Here is a naive implementation for matching first name, last name, or full name
  $scope.localUnitSearch = function(str) {
    var matches = [];

    $scope.units.forEach(function(unit) {
      if ((unit.unit_type.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0))  {
        matches.push(unit.unit_type);
      }
    });
    if (matches.length == 0) {
       matches.push(str);
    }
    return matches;
  };

  $scope.createSavedRecipe = function(recipeId, userId) {

  }

}]);
