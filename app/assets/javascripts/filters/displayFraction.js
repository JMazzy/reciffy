reciffy.filter('displayFraction', function() {
  return function(input) {

<<<<<<< HEAD
    var fraction = new Fraction(Number(input));
=======
    var fraction = new Fraction(input);
>>>>>>> 64c1eebd552a0fa5a1fb546f55f070f1f70981b5

    return fraction.toFraction(true);
  }
});
