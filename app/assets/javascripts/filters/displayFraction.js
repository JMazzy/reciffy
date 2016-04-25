reciffy.filter('displayFraction', function() {
  return function(input) {

    var fraction = new Fraction(Number(input));

    return fraction.toFraction(true);
  }
});
