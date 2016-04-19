reciffy.factory('savedRescipeService', ['Restangular', function(Restangular) {
  var getAllSavedRecipes = function() {
    Restangular.all('saved_recipes').getList().then(function(result){
      
    });
  }
}]);
