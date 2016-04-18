var reciffy = angular.module('reciffy', ['ui.router', 'restangular', 'Devise'])

config(function(AuthProvider) {
    // Configure Auth service with AuthProvider
}).
controller('myCtrl', function(Auth) {
    // Use your configured Auth service.
});

reciffy.factory('_', ['$window', function($window) {
  return $window._; // assumes underscore has already been loaded on the page
}]);

// Restangular Config
reciffy.config( ['RestangularProvider', function(RestangularProvider) {

  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');
  RestangularProvider.setDefaultHttpFields({
    "content-type": "application/json"
  });
  RestangularProvider.setResponseExtractor( function( response, operation ) {
    // Extractor code here
  });

}]);

reciffy.config(['$urlRouterProvider', '$stateProvider',
  function($urlRouterProvider, $stateProvider){

    $stateProvider

    .state("main", {
      url: "/",
      template: "<div ui-view></div>",
      controller: "ReciffyCtrl"
    })

    $urlRouterProvider.otherwise('/');

  }]);
