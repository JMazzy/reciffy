reciffy.controller('SubscriptionCtrl', ['Restangular', 'Auth', 'subscriptionService', '$scope', 
                                         '$stateParams', '$state', 'currentUser', 
                                         function( Restangular, Auth, subscriptionService, $scope, 
                                                   $stateParams, $state, 
                                                   currentUser){

  allSubscriptions = subscriptionService.getindex()
  $scope.currentUser = currentUser;

  //subscriptionService.populateSubscriptions(allSubscriptions);
  $scope.subscriptions = subscriptionService.getSubscriptions(); 
  
  $scope.removeSubscription = function(subscriptionObj) {
  	subscriptionService.destroy(subscriptionObj)
  }
}]);
