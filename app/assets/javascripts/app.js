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
      template: "<div ui-view></div>"
    })
    // Home Page / Dashboard / Recipes Index
    .state("recipes", {
      url: "/recipes"
    })
    .state("recipes.my", {
      url: "/my"
    })
    .state("recipes.saved", {
      url: "/saved"
    })
    .state("recipes.liked", {
      url: "/liked"
    })
    // Recipe Show Page
    .state("recipes.show", {
      url: "/:id",
    })
    // Create Recipe Page
    .state("recipe.create", {
      url: "/new"
    })
    // Subscription Page
    .state("users", {
      url: "/users"
    })
    // Profile Page for Users
    .state("users.show", {
      url: "/:id/profile"
    })

    $urlRouterProvider.otherwise('/');

  }]);
