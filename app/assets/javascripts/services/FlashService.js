reciffy.factory('FlashService', ['Restangular', function(Restangular) {

  _flashes = [];
  _flash = { key: null, message: null };

  var getFlash = function() {
    return _flash;
  }

  var setNextFlash = function() {
    var flash = _flashes.shift();
    if ( !!flash ) {
      _flash.key = flash.key;
      _flash.message = flash.message;
    }
  }

  var retrieveFlash = function() {
    Restangular
    .all('flashes')
    .getList()
    .then( function(flash) {
      for ( var f = 0; f < flash.length; f++ ) {
        var key = flash[f][0];
        var message = flash[f][1];
        _flashes.push({ key: key, message: message });
      }
      setNextFlash();
    });
  }

  return {
    retrieveFlash: retrieveFlash,
    setNextFlash: setNextFlash,
    getFlash: getFlash,
  };

}]);
