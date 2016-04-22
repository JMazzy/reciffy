reciffy.factory('RecommendationService', ['Restangular', '$state', '$stateParams', function(Restangular, $state, $stateParams) {

  _recommendations = [];

  var getRecommendations = function() {
    return _recommendations;
  }

  var populateRecommendations = function() {
    _recommendations.length = 0;

    // Get the list of ids of recommended recipes
    Restangular
    .all('recommendations')
    .getList()
    .then(function(response) {
      console.log(response);
      for ( var r = 0; r < response.length; r++ ) {
        _recommendations[r] = response[r].id;
      }
    })
  }

  return {
    getRecommendations: getRecommendations,
    populateRecommendations: populateRecommendations,
  };
}]);
