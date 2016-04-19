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

  $scope.deleteComment = function() {

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

  $scope.deleteTag = function(tag_id) {

  }

}]);
