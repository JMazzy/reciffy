reciffy.controller( 'RecipeIndexCtrl', [ '$scope', '$state', '$stateParams', 'Restangular', 'RecipeService', function($scope, $state, $stateParams, Restangular, RecipeService ) {

  $scope.recipes = Restangular.all('recipes').getList().$object;

}]);
