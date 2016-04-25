reciffy.filter('avgRating', function() {
  return function(ratings) {
    var filtered = 0;

    if ( !!ratings ) {
      var sum = ratings.reduce(function(previousValue, currentValue, currentIndex, arr) {
        return arr[currentIndex].rating + previousValue;
      }, 0)

      filtered = sum / ratings.length;
    }

    return filtered;
  }
});
