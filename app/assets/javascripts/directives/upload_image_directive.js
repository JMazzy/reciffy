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
        // updates scope; not sure if this is needed here, I can not remember with the testing I did...and I do not quite understand the apply method that well, as I have read limited documentation on it.
        scope.$apply();
        // converts file to binary string
        reader.readAsBinaryString(file);
      });

    },

    controller: ['$scope', 'Restangular', function($scope, Restangular){
      $scope.uploadImage = function (path) {
       // if updating profile
        if ($scope.profile.id) {
          // do put request
          Restangular.one('profiles', $scope.profile.id).put({
            avatar: $scope.
          }).then( function (result) {
            // create image link (rails returns the url location of the file; depending on your application config, you may not need baseurl)
            $scope.userImageLink = 'http://localhost:3000/' + result.image_url;
          }, function (error) {
            console.log('errors', JSON.stringify(errors));
          });
        };
      };
    }]
  }
})