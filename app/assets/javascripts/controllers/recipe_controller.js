reciffy.controller('RecipeCtrl', ['$scope', '$state', 'Restangular', 'RecipeService', function($scope, $state, Restangular, RecipeService) {

  $scope.recipes = Restangular.all('recipes').getList().$object

}]);
