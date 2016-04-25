reciffy.directive('uploadRecipeImage', function() {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      var reader = new FileReader();
      reader.onload = function(e) {
        scope.imageData = btoa(e.target.result);
        scope.uploadImage(scope.imagePath);
        scope.$apply();
      };

      elem.on('change', function() {
        var file = elem[0].files[0];
        // gathers file data (filename and type) to send in json
        scope.imageContent = file.type;
        scope.imagePath = file.name;
        scope.$apply();
        reader.readAsBinaryString(file);
      });

    },

    scope: true
  }
})
