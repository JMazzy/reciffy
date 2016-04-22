reciffy.factory('TagService', ['Restangular', function(Restangular) {

  var _tags = {}
  var _tagHolder = {
    tag: null,
    userIds: [],
    recipeIds: [],
  }

  var getTags = function() {
    return _tags;
  }

  var getTagHolder = function() {
    return _tagHolder;
  }

  var callOneTag = function(tag_id) {
    Restangular
    .one('tags', tag_id)
    .get()
    .then( function(response) {
      _tagHolder.tag = response;
      for ( var t = 0; t < response.taggings.length; t++ ) {
        var tagging = response.taggings[t];
        if ( tagging.taggable_type === "Profile" ) {
          _tagHolder.userIds.push(tagging.taggable_id);
        } else if ( tagging.taggable_type === "Recipe" ) {
          _tagHolder.recipeIds.push(tagging.taggable_id);
        }
      }
    });
  }

  return {
    getTags: getTags,
    getTagHolder: getTagHolder,
    callOneTag: callOneTag,
  }

}]);
