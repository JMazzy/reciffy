reciffy.factory('topUserCooksService', ['Restangular', function(Restangular) {

  var _top = [];

  var callTopUserCooks = function() {
    // Don't make another API call if we already have the data
    if (Object.keys(_top).length === 0) {
      return Restangular.all('top_cooks').getList()
      .then(
        function(data) {
          populateTopUserCooks(data);
          console.log(_top);
        },
        function(error) {
          console.log("API call for top user cooks didn't work.");
        }
      );
    }
  };

  var populateTopUserCooks = function(rawData) {
    rawData.forEach(function(userJson) {
      _top.push(userJson);
    });
  };

  var getTopUserCooks = function() {
    return _top;
  };

  return {
    callTopUserCooks: callTopUserCooks,
    getTopUserCooks: getTopUserCooks
  };
}]);
