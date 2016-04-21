reciffy.controller('UserShowCtrl', ['$scope', '$state', '$stateParams', 'Restangular', 'UserService', 'subscriptionService', 'currentUser', 'FileUploader', function($scope, $state, $stateParams, Restangular, UserService, subscriptionService, currentUser, FileUploader) {

  $scope.user_subscribed = false

  Restangular.one('users', $stateParams.id).get()
  .then(function(user) {
    $scope.user = user;
    $scope.profile = user.profile;
    $scope.userRecipes = user.recipes;
    $scope.userMadeRecipes = user.recipes_made;
    $scope.userSavedRecipes = user.recipes_saved;
    $scope.received_subscriptions = user.received_subscription_requests
    $scope.checkSubscriberExists(user)
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
      state: $scope.profile.state
    }).then(function(newProfile) {
      console.log(newProfile);
    })
  };

  $scope.addSubscriber = function(user) {
    subscriptionService.create(user)
    $scope.user_subscribed = true
  }

  $scope.checkSubscriberExists = function(user) {
    if (currentUser.id == user.id ) {
       $scope.user_subscribed = true
    } else if ($scope.received_subscriptions != null) {
      for (var i = 0; i < $scope.received_subscriptions.length; i++) {
        if ($scope.received_subscriptions[i].subscriber_id == currentUser.id) {
           $scope.user_subscribed = true
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

  // Uploader
  $scope.uploader = new FileUploader({
    url: '/api/v1/profiles/' + currentUser.id
  });

  // $scope.uploadFile = function(fileItem) {
  //   console.log(fileItem);
  //   $scope.fileItem = fileItem;
  //   var fd = new FormData();
  //   fd.append('file', fileItem);
  //   Restangular.one('profiles', $scope.profile.id)
  //   .withHttpConfig({transformRequest: angular.identity})
  //   .customPost(fd, '', undefined, {'Content-Type': undefined})
  //   .then(function(newProfile) {
  //     console.log(newProfile);
  //   })
  // };

}])
