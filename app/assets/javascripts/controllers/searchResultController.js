reciffy.controller('searchResultCtrl',
  [
    'RecipeService',
    'TagService',
    'UserService',
    '$scope',
    '$stateParams',
    '$state',
    function(
      RecipeService,
      TagService,
      UserService,
      $scope,
      $stateParams,
      $state){
        $scope.searchTag = TagService.findTagByName($stateParams.searchString);
        console.log($scope.searchTag);
        if ($scope.searchTag) {
          TagService.callOneTag($scope.searchTag.id);
          $scope.tagHolder = TagService.getTagHolder();
          $scope.recipes = RecipeService.getRecipes();
          $scope.users = UserService.getUsers();
        } else {
          $scope.noResults = "Sorry! No recipes or users by that tag!"
        }

}]);
