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
    _tagHolder.userIds = [];
    _tagHolder.recipeIds = [];

    Restangular
    .one('tags', tag_id)
    .get()
    .then( function(response) {
      _tagHolder.tag = response;
      for ( var t = 0; t < response.taggings.length; t++ ) {
        var tagging = response.taggings[t];
        if ( tagging.taggable_type === "Profile" ) {
          if ( _tagHolder.userIds.indexOf(tagging.taggable_id) === -1 ) {
            _tagHolder.userIds.push(tagging.taggable_id);
          }
        } else if ( tagging.taggable_type === "Recipe" ) {
          if ( _tagHolder.recipeIds.indexOf(tagging.taggable_id) === -1 ) {
            _tagHolder.recipeIds.push(tagging.taggable_id);
          }
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
