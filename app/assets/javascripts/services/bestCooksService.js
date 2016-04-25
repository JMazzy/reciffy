reciffy.factory('bestCooksService', ['Restangular', function(Restangular) {

  var _top = [];

  var callBestCooks = function() {
    // Don't make another API call if we already have the data
    if (Object.keys(_top).length === 0) {
      return Restangular.all('best_cooks').getList()
      .then(
        function(data) {
          populateBestCooks(data);
        },
        function(error) {
          console.error("API call for top user cooks didn't work.");
        }
      );
    }
  };

  var populateBestCooks = function(rawData) {
    rawData.forEach(function(userJson) {
      _top.push(userJson);
    });
  };

  var getBestCooks = function() {
    return _top;
  };

  return {
    callBestCooks : callBestCooks,
    getBestCooks  : getBestCooks
  };
}]);
