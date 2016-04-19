app.directive('recipeDirective', function(){
  return {
    templateUrl: "javascripts/directives/recipe.html",
    restrict: "A",
    scope: {
      name: "@",
      description: "@",
      photo: "@",
    }
  };
});
