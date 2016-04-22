reciffy.directive('userDirective', function(){
  return {
    templateUrl: "templates/directives/user_directive.html",
    restrict: "E",
    scope: {
      user: "="
    },
  };
});
