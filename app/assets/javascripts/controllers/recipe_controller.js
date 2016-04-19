reciffy.controller('RecipeCtrl', ['$scope', '$state', 'Restangular', 'RecipeService', function($scope, $state, Restangular, RecipeService) {

  $scope.recipes = RecipeService.getRecipeList();

  console.log($scope.recipes);

}]);
