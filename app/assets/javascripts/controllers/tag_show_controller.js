reciffy.controller('TagCtrl', [ '$scope', '$state', '$stateParams', 'Restangular', 'RecipeService', 'TagService', function( $scope, $state, $stateParams, Restangular, RecipeService, TagService ){

  TagService.callOneTag($stateParams.id);

  $scope.tagHolder = TagService.getTagHolder();

}]);
