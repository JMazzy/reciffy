reciffy.filter('displayFraction', function() {
  return function(input) {

    var fraction = new Fraction(input);

    return fraction.toFraction(true);
  }
});
