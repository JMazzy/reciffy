var app = angular.module('app', ['ui.router', 'restangular', 'Devise'])

config(function(AuthProvider) {
    // Configure Auth service with AuthProvider
}).
controller('myCtrl', function(Auth) {
    // Use your configured Auth service.
});

app.factory('_', ['$window', function($window) {
  return $window._; // assumes underscore has already been loaded on the page
}]);

// Restangular Config
app.config( ['RestangularProvider', function(RestangularProvider) {

  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');
  RestangularProvider.setDefaultHttpFields({
    "content-type": "application/json"
  });
  RestangularProvider.setResponseExtractor( function( response, operation ) {
    // Extractor code here
  });

}]);

app.config(['$urlRouterProvider', '$stateProvider',
  function($urlRouterProvider, $stateProvider){

    $stateProvider

    .state("topstate", {
      url: "/",
      template: "<div ui-view></div>",
      controller: "OneCtrl"
    })
    .state("topstate.nestedstate", {
      url: "nestedstateurl",
      templateUrl: "templates/nested.html",
      controller: "TwoCtrl"
    })

    $urlRouterProvider.otherwise('/default');

  }]);
