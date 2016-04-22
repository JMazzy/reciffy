reciffy.factory('topRatedUserService', ['Restangular', function(Restangular) {

  var _top = [];

  var callTopRateUsers = function() {
    // Don't make another API call if we already have the data
    if (Object.keys(_top).length === 0) {
      return Restangular.all('top_rated_users').getList()
      .then(
        function(data) {
          populateTopRatedUsers(data);
          console.log(_top);
        },
        function(error) {
          console.log("API call for top rated users didn't work.");
        }
      );
    }
  };

  var populateTopRatedUsers = function(rawData) {
    rawData.forEach(function(userJson) {
      _top.push(userJson);
    });
  };

  var getTopRatedUsers = function() {
    return _top;
  };

  return {
    callTopRatedUsers: callTopRatedUsers,
    getTopRatedUsers: getTopRatedUsers
  };
}]);
