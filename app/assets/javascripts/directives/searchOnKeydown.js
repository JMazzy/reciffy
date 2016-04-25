reciffy.directive('searchOnKeydown', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      // when user hits "enter" or "return"
      if (event.which === 13) {
        scope.$apply(function (){
          scope.$eval(attrs.searchOnKeydown);
        });
        event.preventDefault();
      }
    });
  };
});
