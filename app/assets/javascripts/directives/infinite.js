reciffy.directive('infinite', [
  function () {
    return {
      restrict: 'A',
      link: function ($scope, element, attr) {
        var raw = element[0];
        element.bind('scroll', _.throttle(function () {
          if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
            $scope.$apply(attrs.bimeInfiniteScroll);
          }
        }, 200));
      }
    };
  }
]);
