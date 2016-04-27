reciffy.factory('FlashService', ['Restangular', function(Restangular) {

  _flashes = [];

  var getFlash = function() {
    return _flashes;
  }

  var retrieveFlash = function() {
    clearFlash();
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

  var clearFlash = function() {
    for ( var f = 0; f < _flashes.length; f++ ) {
      _flashes.pop();
    }
    _flashes.length = 0;
  }

  return {
    retrieveFlash: retrieveFlash,
    getFlash: getFlash,
    clearFlash: clearFlash,
  };

}]);
