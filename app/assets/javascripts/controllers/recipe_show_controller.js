reciffy.controller( 'RecipeShowCtrl', [ '$scope', '$state', '$stateParams', 'Restangular', 'RecipeService', function($scope, $state, $stateParams, Restangular, RecipeService ) {

  Restangular.one('recipes', $stateParams.id).get()
  .then(function(recipe) {
    $scope.recipe = recipe;
    $scope.recipeIngredients = recipe.recipe_ingredients;
    $scope.tags = recipe.tags;
    $scope.newTag = { name: "" };
    $scope.comments = recipe.comments;
    $scope.comment = {
      comment_description: "",
      recipe_id: recipe.id,
    };
    console.log(recipe.tags)
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

}]);
