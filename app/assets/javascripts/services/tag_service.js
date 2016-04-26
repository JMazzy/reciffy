reciffy.factory('TagService', ['Restangular', 'RecipeService', function(Restangular, RecipeService) {

  var _tags = {};
  var _tagIdList = [];
  var _tagHolder = {
    tag: null,
    userIds: [],
    recipeIds: [],
  };

  var setTags = function() {
    Restangular
    .all('tags')
    .getList()
    .then(function(tags) {
      _tagIdList.length = 0;
      for (var tag in tags) {
        _tags[tag] = tags[tag];
        _tagIdList.push(tag.id);
      }
    });
  };

  var findTagByName = function(tagName) {
    var temp;
    for (var tag in _tags) {
      temp = _tags[tag];
      if (temp) {
        if (tagName == temp.name) {
          return temp;
        }
      }
    }
  };

  var getIdList = function() {
    return _tagIdList;
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
          RecipeService.setOneRecipe(tagging.taggable_id);
        }
      }
    });
  }

  return {
    setTags: setTags,
    getTags: getTags,
    getTagHolder: getTagHolder,
    callOneTag: callOneTag,
    findTagByName: findTagByName
  }

}]);
