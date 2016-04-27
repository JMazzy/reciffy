reciffy.controller( 'ReciffyCtrl', ['$scope', '$rootScope', 'FlashService', function($scope, $rootScope, FlashService) {

  $scope.flash = FlashService.getFlash();

  FlashService.retrieveFlash();

  $rootScope.$on('$stateChangeSuccess', function() {
    FlashService.retrieveFlash();
  });
}]);
