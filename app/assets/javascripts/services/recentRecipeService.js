reciffy.factory('RecentRecipeService', ['Restangular', '$state', '$stateParams', function(Restangular, $state, $stateParams) {
  _recipes = [];

  var getRecipes = function() {
    callRecipes();
    return _recipes;
  };

  var callRecipes = function() {
    if ( _recipes.length < 1 ) {
      Restangular
      .all('recent_recipes')
      .getList()
      .then( function(response) {
        for (var i = 0; i < response.length; i++ ) {
          _recipes.push( response[i] );
        }
      })
    }
  };

  return {
    getRecipes: getRecipes,
  };
}]);
