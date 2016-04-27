reciffy.directive('flash', function(){
  return {
    templateUrl: "templates/directives/flash.html",
    restrict: "E",
    scope: {
      flash: "="
    },
  };
});
