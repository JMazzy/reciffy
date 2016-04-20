reciffy.controller( 'RecipeShowCtrl',
                    [ '$scope', '$state', '$stateParams', 'Restangular', 'RecipeService', 'madeRecipeService',
                    function($scope, $state, $stateParams, Restangular, RecipeService, madeRecipeService) {

  $scope.recipe = {
    name: "",
    description: "",
    instructions: "",
    rating: null,
    recipe_ingredients: [],
    tags: [],
    comments: [],
  }

}]);
