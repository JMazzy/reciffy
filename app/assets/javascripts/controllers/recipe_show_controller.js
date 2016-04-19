reciffy.controller( 'RecipeShowCtrl', [ '$scope', '$state', '$stateParams', 'Restangular', 'RecipeService', function($scope, $state, $stateParams, Restangular, RecipeService ) {

  $scope.recipe = Restangular.one('recipes', $stateParams.id).get().$object;

}]);
