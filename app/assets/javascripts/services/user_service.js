reciffy.factory('UserService', ['Restangular', '$state', function(Restangular, $state) {

  var obj = {};
  obj.getUsers = function() {
    return Restangular.all('users').getList().$object;
  };

  obj.getUser = function(user_id) {
    return Restangular.one('users', user_id).get().$object;
  }

  return obj;
}])
