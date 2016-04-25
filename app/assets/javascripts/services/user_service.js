reciffy.factory('UserService', ['Restangular', '$state', function(Restangular, $state) {

  var _users = {};

  var setUsers = function() {
    Restangular.all('users').getList()
    .then(function(users) {
      for (var u = 0; u < users.length; u++ ) {
        _users[users[u].id] = users[u];
      }
    })
  };

  var getUsers = function() {
    return _users;
  };

  return {
    getUsers: getUsers,
    setUsers: setUsers
  };
}])
