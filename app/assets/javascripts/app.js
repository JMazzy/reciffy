var reciffy = angular.module('reciffy', ['ui.router', 'restangular', 'Devise'])
// reciffy.config(function(AuthProvider) {
//     // Configure Auth service with AuthProvider
// }).
// reciffy.controller('myCtrl', function(Auth) {
//     // Use your configured Auth service.
// });

// reciffy.factory('_', ['$window', function($window) {
//   return $window._; // assumes underscore has already been loaded on the page
// }]);

// Restangular Config
reciffy.config( ['$urlRouterProvider', '$stateProvider','RestangularProvider', 'AuthProvider', function($urlRouterProvider,$stateProvider,RestangularProvider,AuthProvider) {

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
    .state("subscriptions", {
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
    $urlRouterProvider.otherwise('/');

  }]);


reciffy.run(function($rootScope, $location, Auth){
 $rootScope.$on("$stateChangeError", console.log.bind(console));
  });
