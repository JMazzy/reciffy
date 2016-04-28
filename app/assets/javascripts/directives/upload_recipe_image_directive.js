reciffy.directive('uploadRecipeImage', function() {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      var reader = new FileReader();
      reader.onload = function(e) {
        scope.photo.imageData = btoa(e.target.result);
        console.log("IMAGE SHOULD UPLOAD");
        console.log(scope.photo);
        scope.uploadImage(scope.photo.imagePath);
        scope.$apply();
      };

      elem.on('change', function() {
        console.log("EVENT LISTENER WORKS");
        var file = elem[0].files[0];
        console.log(file);
        // gathers file data (filename and type) to send in json
        scope.photo.imageContent = file.type;
        scope.photo.imagePath = file.name;
        scope.$apply();
        reader.readAsBinaryString(file);
      });

    },

    scope: true
  }
})
