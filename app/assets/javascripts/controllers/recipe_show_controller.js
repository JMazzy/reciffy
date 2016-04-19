reciffy.controller( 'RecipeShowCtrl', [ '$scope', '$state', '$stateParams', 'Restangular', 'RecipeService', function($scope, $state, $stateParams, Restangular, RecipeService ) {

  Restangular.one('recipes', $stateParams.id).get()
  .then(function(recipe) {
    $scope.recipe = recipe;
    $scope.recipeIngredients = recipe.recipe_ingredients;
    $scope.tags = recipe.tags;
    $scope.comments = recipe.comments;
    console.log(recipe.tags)
  });

  $scope.createComment = function() {

  }

  $scope.deleteComment = function() {

  }

  $scope.addTag = function() {

  }

  $scope.deleteTag = function(tag_id) {

  }

}]);
