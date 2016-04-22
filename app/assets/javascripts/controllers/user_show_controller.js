reciffy.controller('UserShowCtrl', ['$scope', '$state', '$stateParams', 'Restangular', 'UserService', 'subscriptionService', 'currentUser', 'Upload', function($scope, $state, $stateParams, Restangular, UserService, subscriptionService, currentUser, Upload) {

  $scope.user_subscribed = false;

  Restangular.one('users', $stateParams.id).get()
  .then(function(user) {
    $scope.user = user;
    $scope.profile = user.profile;
    $scope.userRecipes = user.recipes;
    $scope.userMadeRecipes = user.recipes_made;
    $scope.userSavedRecipes = user.recipes_saved;
    $scope.received_subscriptions = user.received_subscription_requests;
    $scope.checkSubscriberExists(user);
    $scope.disabledStatus = (currentUser.id != $stateParams.id);
    $scope.tags = user.profile.tags;
    $scope.newTag = { name: "" };
    $scope.avatar = user.photo.url.medium;
  })


  $scope.updateUserProfile = function(user) {
    Restangular.one('profiles', $scope.profile.id).patch({
      first_name: $scope.profile.first_name,
      last_name: $scope.profile.last_name,
      bio: $scope.profile.bio,
      tagline: $scope.profile.tagline,
      city: $scope.profile.city,
      state: $scope.profile.state,
    }).then(function(newProfile) {
      console.log(newProfile);
      console.log($scope.avatar);
    })
  };

  $scope.addSubscriber = function(user) {
    subscriptionService.create(user);
    $scope.user_subscribed = true;
  }

  $scope.checkSubscriberExists = function(user) {
    if (currentUser.id == user.id ) {
       $scope.user_subscribed = true;
    } else if ($scope.received_subscriptions != null) {
      console.log("In here!")
      for (var i = 0; i < $scope.received_subscriptions.length; i++) {
        if ($scope.received_subscriptions[i].subscriber_id == currentUser.id) {
          console.log("In here!!!")
           $scope.user_subscribed = true;
        }
      }
    } else {
       $scope.user_subscribed = false
    }
  }

  $scope.addTag = function() {
    Restangular.all('tags')
    .post($scope.newTag, { taggable_id: $scope.profile.id, taggable_type: "Profile"})
    .then( function(newTag) {
      $scope.tags.unshift(newTag);
      $scope.newTag = {
        name: "",
      };
    })
  };

  // Actually only deletes that particular TAGGING, not the tag itself
  $scope.deleteTag = function(tag_id) {
    Restangular.one("tags", tag_id)
    .remove({ taggable_id: $scope.profile.id, taggable_type: "Profile"})
    .then(function(deletedTag) {
      for ( var t = 0; t < $scope.tags.length; t++ ) {
        if ( $scope.tags[t].id === deletedTag.id ) {
          $scope.tags.splice(t, 1);
        }
      }
    })
  };

  $scope.openFileWindow = function () {
    angular.element( document.querySelector( '#fileUpload' ) ).trigger('click');
    console.log('triggering click');
  };

  $scope.uploadImage = function (path) {
   // if updating profile
    if ($scope.profile.id) {
      // do put request
      Restangular.one('profiles', $scope.profile.id).customPUT({
        profile: {
          avatar: $scope.profile.imageData
        }
      }).then( function (result) {
        // create image link (rails returns the url location of the file; depending on your application config, you may not need baseurl)
        console.log('Uploaded image');
        $scope.avatar = $scope.user.photo.url.medium;
        console.log($scope.avatar);
      }, function (error) {
        console.log('errors', JSON.stringify(errors));
      });
    };
  };

}])
