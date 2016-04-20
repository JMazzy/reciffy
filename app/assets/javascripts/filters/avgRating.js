reciffy.filter('avgRating', function() {
  return function(ratings) {
    var sum = ratings.reduce(function(previousValue, currentValue, currentIndex, arr) {
      return arr[currentIndex].rating + previousValue;
    }, 0)

    return sum / ratings.length;
  }
});
