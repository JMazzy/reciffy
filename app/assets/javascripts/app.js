var reciffy = angular.module('reciffy', ['ui.router', 'restangular', 'Devise'])

.config(function(AuthProvider) {
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
  // RestangularProvider.setResponseExtractor( function( response, operation ) {
  //   // Extractor code here
  // });

}]);

reciffy.config(['$urlRouterProvider', '$stateProvider',
  function($urlRouterProvider, $stateProvider){

    $stateProvider

    .state("reciffy", {
      url: "",
      template: "<div ui-view></div>",
    })
    // Home Page / Dashboard / Recipes Index
    .state("reciffy.recipes", {
      url: "/recipes",
      template: "<div ui-view></div>",
    })
    .state("reciffy.recipes.all", {
      url: "/all",
      templateUrl: "templates/recipes.html",
      controller: "RecipeIndexCtrl",
    })
    .state("reciffy.recipes.my", {
      url: "/my"
    })
    .state("reciffy.recipes.saved", {
      url: "/saved"
    }) pu
    .state("reciffy.recipes.liked", {
      url: "/liked"
    })
    // Recipe Show Page
    .state("reciffy.recipes.show", {
      url: "/:id",
      templateUrl: "templates/recipe.html",
      controller: "RecipeShowCtrl"
    })
    // Create Recipe Page
    .state("reciffy.recipe.create", {
      url: "/new"
    })
    // Subscription Page
    .state("reciffy.users", {
      url: "/users"
    })
    // Profile Page for Users
    .state("reciffy.users.show", {
      url: "/:id/profile"
    })
    .state("reciffy.subscriptions", {
      url: "/subscriptions"
    })
    $urlRouterProvider.otherwise('/recipes');

  }]);
