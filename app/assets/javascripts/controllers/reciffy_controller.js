reciffy.controller( 'ReciffyCtrl', ['$scope', '$rootScope', 'FlashService', function($scope, $rootScope, FlashService) {

  $scope.flash = FlashService.getFlash();

  $rootScope.$on('$stateChangeSuccess', function() {
    FlashService.retrieveFlash();
  });
}]);
