reciffy.factory('topUserService', ['Restangular', function(Restangular) {

  var _top = [];

  var callTopUsers = function() {
    // Don't make another API call if we already have the data
    if (Object.keys(_top).length === 0) {
      return Restangular.all('top_users').getList()
      .then(
        function(data) {
          populateTopUsers(data);
        },
        function(error) {
          console.error("API call for top subscribed users didn't work.");
        }
      );
    }
  };

  var populateTopUsers = function(rawData) {
    rawData.forEach(function(userJson) {
      _top.push(userJson);
    });
  };

  var getTopUsers = function() {
    return _top;
  };

  return {
    callTopUsers: callTopUsers,
    getTopUsers: getTopUsers
  };
}]);
