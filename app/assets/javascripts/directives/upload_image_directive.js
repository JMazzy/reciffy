reciffy.directive('uploadImage', function() {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      var reader = new FileReader();
      reader.onload = function(e) {
        scope.profile.imageData = btoa(e.target.result);
        scope.uploadImage(scope.profile.imagePath);
        scope.$apply();
      };

      elem.on('change', function() {
        console.log('entered change function');
        var file = elem[0].files[0];
        // gathers file data (filename and type) to send in json
        scope.profile.imageContent = file.type;
        scope.profile.imagePath = file.name;
        scope.$apply();
        reader.readAsBinaryString(file);
      });

    },

    scope: true
  }
})