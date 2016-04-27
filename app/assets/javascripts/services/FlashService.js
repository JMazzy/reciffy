reciffy.factory('FlashService', ['Restangular', function(Restangular) {

  _flashes = [];

  var getFlash = function() {
    return _flashes;
  }

  var retrieveFlash = function() {
    _flashes.length = 0;
    Restangular
    .all('flashes')
    .getList()
    .then( function(flash) {
      console.log(flash)
      for ( var f = 0; f < flash.length; f++ ) {
        _flashes.push(flash[f]);
      }
    });
  }

  return {
    retrieveFlash: retrieveFlash,
    getFlash: getFlash,
  };

}]);
