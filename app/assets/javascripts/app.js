var reciffy = angular.module('reciffy', ['ui.router', 'restangular', 'Devise', 'xeditable'])

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
      url: "/my",
      templateUrl: '/templates/my_recipe_layout.html',
      controller: 'MyCtrl',
      resolve: {
        currentUser: ['Auth', function(Auth) {
          return Auth.currentUser();
        }]
      },
    })
    .state("reciffy.recipes.made", {
      url: "/made",
      templateUrl: '/templates/made_recipe_layout.html',
      controller: 'MadeCtrl',
      resolve: {
        currentUser: ['Auth', function(Auth) {
          return Auth.currentUser();
        }]
      },
    })
    // Saved Recipes Page
    .state("reciffy.recipes.saved", {
      url: "/saved",
      controller: "savedRecipeCtrl",
      templateUrl: "templates/saved.html"
    })
    // Rated Recipes Page
    .state("reciffy.recipes.rated", {
      url: "/rated",
      controller: "ratedRecipeCtrl",
      templateUrl: "templates/rated.html"
    })
    // Recipe Show Page
    .state("reciffy.recipes.show", {
      url: "/:id",
      templateUrl: "templates/recipe.html",
      controller: "RecipeShowCtrl",
      resolve: {
        currentUser: ['Auth', function(Auth) {
          return Auth.currentUser();
        }]
      },
    })
    // Create Recipe Page
    .state("reciffy.recipes.create", {
      url: "/new"
    })
    // Users
    .state("reciffy.users", {
      url: "/users",
      template: "<div ui-view></div>"
    })
    .state("reciffy.users.all", {
      url: '/all',
      templateUrl: "templates/users.html",
      controller: "UserIndexCtrl"
    })
    // Profile Page for Users
    .state("reciffy.users.show", {
      url: "/:id/profile",
      templateUrl: "templates/user_profile.html",
      controller: "UserShowCtrl",
      resolve: {
        currentUser: ['Auth', function(Auth) {
          return Auth.currentUser();
        }]
      },
    })
    // Subscriptions
    .state("reciffy.subscriptions", {
      url: "/subscriptions",
      templateUrl: '/templates/subscription_layout.html',
      controller: 'SubscriptionCtrl',
      resolve: {
        currentUser: ['Auth', function(Auth) {
          return Auth.currentUser();
        }],
        allSubscriptions: ['Restangular', function(Restangular){
          return Restangular.all("subscriptions").getList().then(function(data){
              data;
          });
        }]
      },
    })
    $urlRouterProvider.otherwise('/recipes/all');
  }]);

reciffy.run(function($rootScope, $location, Auth){
 $rootScope.$on("$stateChangeError", console.log.bind(console));
  });
