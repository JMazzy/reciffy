reciffy.controller( 'ReciffyCtrl', ['$scope', '$rootScope', 'FlashService', function($scope, $rootScope, FlashService) {

  var loadFlash = function() {
    console.log("flash")
    FlashService.retrieveFlash();
    $scope.flash = FlashService.getFlash();
  }

  console.log("initial load")
  loadFlash();

  $rootScope.$on('$stateChangeSuccess', function() {
    console.log("state changed")
    loadFlash();
  });
}]);
