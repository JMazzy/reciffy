reciffy.directive('recipeDirective', function(){
  return {
    templateUrl: "templates/directives/recipe_directive.html",
    restrict: "A",
    scope: {
      recipe: "@",
    }
  };
});
