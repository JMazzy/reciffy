reciffy.directive('recipeDirective', function(){
  return {
    templateUrl: "templates/directives/recipe_directive.html",
    restrict: "E",
    scope: {
      recipe: "="
    },
  };
});
